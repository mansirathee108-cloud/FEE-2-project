import com.sun.net.httpserver.*;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.*;

public class ValidatorServer {

    // Simple fixed thread pool for validation - 3 threads
    private static final ExecutorService validationExecutor = Executors.newFixedThreadPool(3);

    // Validation result class
    static class ValidationResult {
        public String field;
        public boolean valid;
        public String message;

        public ValidationResult(String field, boolean valid, String message) {
            this.field = field;
            this.valid = valid;
            this.message = message;
        }
    }

    // Response class for JSON serialization
    static class ValidationResponse {
        public boolean success;
        public List<ValidationResult> results;
        public String error;

        public ValidationResponse(boolean success, List<ValidationResult> results) {
            this.success = success;
            this.results = results;
        }

        public ValidationResponse(String error) {
            this.success = false;
            this.error = error;
            this.results = new ArrayList<>();
        }
    }

    // Core validation logic - runs 3 validations concurrently
    static List<ValidationResult> validate(String email, String username, String password) {
        Future<ValidationResult> emailFuture = validationExecutor.submit(() -> validateEmail(email));
        Future<ValidationResult> usernameFuture = validationExecutor.submit(() -> validateUsername(username));
        Future<ValidationResult> passwordFuture = validationExecutor.submit(() -> validatePassword(password));

        List<ValidationResult> results = new ArrayList<>();
        try {
            results.add(emailFuture.get());
            results.add(usernameFuture.get());
            results.add(passwordFuture.get());
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            return validateSequential(email, username, password);
        }
        return results;
    }

    // Individual validation methods
    private static ValidationResult validateEmail(String email) {
        boolean valid = email != null && email.contains("@") && email.contains(".");
        return new ValidationResult("email", valid,
            valid ? "Email: OK" : "Email: Invalid format");
    }

    private static ValidationResult validateUsername(String username) {
        boolean valid = username != null && username.length() >= 3;
        return new ValidationResult("username", valid,
            valid ? "Username: OK" : "Username: Too short (min 3 chars)");
    }

    private static ValidationResult validatePassword(String password) {
        boolean hasUpper = false, hasLower = false, hasDigit = false;
        if (password != null) {
            for (char c : password.toCharArray()) {
                if (Character.isUpperCase(c)) hasUpper = true;
                if (Character.isLowerCase(c)) hasLower = true;
                if (Character.isDigit(c)) hasDigit = true;
            }
        }
        boolean valid = hasUpper && hasLower && hasDigit && password != null && password.length() >= 8;
        return new ValidationResult("password", valid,
            valid ? "Password: OK" : "Password: Needs upper, lower, digit, 8+ chars");
    }

    // Fallback sequential validation
    private static List<ValidationResult> validateSequential(String email, String username, String password) {
        List<ValidationResult> results = new ArrayList<>();
        results.add(validateEmail(email));
        results.add(validateUsername(username));
        results.add(validatePassword(password));
        return results;
    }

    // Simple JSON serialization (no external dependencies)
    static String toJson(ValidationResponse response) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"success\":").append(response.success).append(",");
        if (response.error != null) {
            sb.append("\"error\":\"").append(escapeJson(response.error)).append("\"");
        } else {
            sb.append("\"results\":[");
            for (int i = 0; i < response.results.size(); i++) {
                ValidationResult r = response.results.get(i);
                if (i > 0) sb.append(",");
                sb.append("{");
                sb.append("\"field\":\"").append(escapeJson(r.field)).append("\",");
                sb.append("\"valid\":").append(r.valid).append(",");
                sb.append("\"message\":\"").append(escapeJson(r.message)).append("\"");
                sb.append("}");
            }
            sb.append("]");
        }
        sb.append("}");
        return sb.toString();
    }

    static String escapeJson(String s) {
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

    // Parse simple JSON request 
    static Map<String, String> parseJson(String json) {
        Map<String, String> map = new HashMap<>();
        String content = json.trim();
        if (content.startsWith("{") && content.endsWith("}")) {
            content = content.substring(1, content.length() - 1);
            String[] pairs = content.split(",");
            for (String pair : pairs) {
                String[] kv = pair.split(":", 2);
                if (kv.length == 2) {
                    String key = kv[0].trim().replaceAll("^\"|\"$", "");
                    String value = kv[1].trim().replaceAll("^\"|\"$", "");
                    map.put(key, value);
                }
            }
        }
        return map;
    }

    public static void main(String[] args) throws IOException {
        int port = 8081;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Use fixed thread pool for HTTP request handling (10 threads)
        server.setExecutor(Executors.newFixedThreadPool(10));

        // CORS headers for local development
        server.createContext("/api/validate", exchange -> {
            // Handle CORS preflight
            addCorsHeaders(exchange);
            String method = exchange.getRequestMethod();
            
            if ("OPTIONS".equals(method)) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!"POST".equals(method)) {
                String response = toJson(new ValidationResponse("Method not allowed"));
                sendResponse(exchange, 405, response);
                return;
            }

            try {
                // Read request body
                String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> data = parseJson(requestBody);

                String email = data.getOrDefault("email", "");
                String username = data.getOrDefault("username", "");
                String password = data.getOrDefault("password", "");

                // Run validation
                List<ValidationResult> results = validate(email, username, password);
                boolean allValid = results.stream().allMatch(r -> r.valid);

                ValidationResponse response = new ValidationResponse(allValid, results);

                // Send response
                sendResponse(exchange, 200, toJson(response));

            } catch (Exception e) {
                addCorsHeaders(exchange);
                sendResponse(exchange, 500, toJson(new ValidationResponse("Server error: " + e.getMessage())));
            }
        });

        // Health check endpoint
        server.createContext("/api/health", exchange -> {
            addCorsHeaders(exchange);
            String response = "{\"status\":\"ok\",\"service\":\"FormValidator\"}";
            sendResponse(exchange, 200, response);
        });

        server.start();

        // Shutdown hook to clean up validation executor
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down validation executor...");
            validationExecutor.shutdown();
            try {
                if (!validationExecutor.awaitTermination(5, TimeUnit.SECONDS)) {
                    validationExecutor.shutdownNow();
                }
            } catch (InterruptedException e) {
                validationExecutor.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }));

        System.out.println("Validator Server running on http://localhost:" + port);
        System.out.println("Endpoints:");
        System.out.println("  POST http://localhost:" + port + "/api/validate");
        System.out.println("  GET  http://localhost:" + port + "/api/health");
    }

    static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
    }

    static void sendResponse(HttpExchange exchange, int code, String response) throws IOException {
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}