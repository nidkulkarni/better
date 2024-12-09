# Better Software Login and Sign-Up App

## How to Run the Project

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npx expo start` to start the project.

## Design Choices

- Used **Formik** for form handling and **Yup** for form validation.
- Included **password strength** indicator for better UX during sign-up.
- Implemented a **Remember Me** checkbox in the login form, which stores the email using **AsyncStorage**.
- Followed clean code principles, keeping components modular and reusable.

## Assumptions or Limitations

- The password strength indicator is basic, considering only password length.
- Formik handles the validation for fields, and AsyncStorage is used for saving the email.
- ![IMG_7336](https://github.com/user-attachments/assets/297f1151-930e-4b53-8c27-048f7a2783f5)
![IMG_7335](https://github.com/user-attachments/assets/e63bd7bd-9acb-4096-8545-cf8afb5e100b)
![IMG_7334](https://github.com/user-attachments/assets/f947e0b1-3a88-424b-b454-3e2b34d72905)
![IMG_7333](https://github.com/user-attachments/assets/187431eb-723b-4153-bdeb-c8e07efe6554)
<img width="869" alt="Screenshot 2024-12-09 at 2 42 11 PM" src="https://github.com/user-attachments/assets/0c2a9134-0932-482c-8a5f-3d37da93bee7">
