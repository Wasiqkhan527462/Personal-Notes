
# Personal Notes App

This is a personal notes application developed using **React** and **Bootstrap**. The app utilizes Firebase for authentication and database services, allowing users to create, manage, and store their notes securely.

## Features

- User authentication (signup and signin)
- Create, edit, and delete notes
- Responsive design using Bootstrap
- Secure storage of notes in Firebase

## Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Firebase (Authentication and Firestore)

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- Node.js

## Screen Shots

## Signup
![Signup](https://github.com/Wasiqkhan527462/Personal-Notes/blob/0400629b2bbe0ee314fdef8f73c0b3177103ba88/Signup.png)

## Login
![Signin](https://github.com/Wasiqkhan527462/Personal-Notes/blob/0400629b2bbe0ee314fdef8f73c0b3177103ba88/Login.png)

## Notes
![Notes](https://github.com/Wasiqkhan527462/Personal-Notes/blob/0400629b2bbe0ee314fdef8f73c0b3177103ba88/Personal%20Notes.png)


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Wasiqkhan527462/Personal-Notes.git
   cd Personal-Notes
   ```

2. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   VITE_APIKEY=<your_firebase_api_key>
   VITE_AUTHDOMAIN=<your_firebase_auth_domain>
   VITE_PROJECTID=<your_firebase_project_id>
   VITE_STORAGEBUCKET=<your_firebase_storage_bucket>
   VITE_MESSAGINGSENDERID=<your_firebase_messaging_sender_id>
   VITE_DATABASEURL=<your_firebase_database_url>
   VITE_APPID=<your_firebase_app_id>
   VITE_MEASUREMENTID=<your_firebase_measurement_id>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

## Usage

- Navigate to [http://localhost:3000](http://localhost:3000) to access the Personal Notes App.
- Sign up or sign in to manage your notes effectively.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bugs you find.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Firebase](https://firebase.google.com/)
