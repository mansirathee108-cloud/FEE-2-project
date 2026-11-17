import java.util.*;

public class FormValidator {

    // Shared results array (thread-unsafe but simple)
    static String[] results = new String[4];

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter email: ");
        String email = scanner.nextLine();

        System.out.print("Enter username: ");
        String username = scanner.nextLine();

        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        System.out.println("\nValidating: " + email + ", " + username + ", " + password);
        System.out.println("Starting 4 threads...\n");

        scanner.close();

        // Thread 1: Email format
        new Thread(() -> {
            try { Thread.sleep(100); } catch (Exception e) {}
            if (email.contains("@") && email.contains("."))
                results[0] = "Email: OK";
            else
                results[0] = "Email: Invalid format";
        }).start();

        // Thread 2: Username length
        new Thread(() -> {
            try { Thread.sleep(150); } catch (Exception e) {}
            if (username.length() >= 3)
                results[1] = "Username: OK";
            else
                results[1] = "Username: Too short";
        }).start();

        // Thread 3: Password strength
        new Thread(() -> {
            try { Thread.sleep(200); } catch (Exception e) {}
            boolean hasUpper = false, hasLower = false, hasDigit = false;
            for (char c : password.toCharArray()) {
                if (Character.isUpperCase(c)) hasUpper = true;
                if (Character.isLowerCase(c)) hasLower = true;
                if (Character.isDigit(c)) hasDigit = true;
            }
            if (hasUpper && hasLower && hasDigit && password.length() >= 8)
                results[2] = "Password: OK";
            else
                results[2] = "Password: Needs upper, lower, digit, 8+ chars";
        }).start();

        // Thread 4: Duplicate check (simulated)
        new Thread(() -> {
            try { Thread.sleep(300); } catch (Exception e) {}
            String[] taken = {"admin", "mayor", "police", "test@oakridge.city"};
            boolean exists = false;
            for (String t : taken) if (t.equals(email) || t.equals(username)) exists = true;
            if (exists) results[3] = "Duplicate: Already taken";
            else results[3] = "Duplicate: Available";
        }).start();

        // Wait for all threads (busy wait - simple but inefficient)
        while (results[0] == null || results[1] == null || results[2] == null || results[3] == null) {
            try { Thread.sleep(50); } catch (Exception e) {}
        }

        // Print results
        System.out.println("=== Results ===");
        for (String r : results) System.out.println(r);
    }
}