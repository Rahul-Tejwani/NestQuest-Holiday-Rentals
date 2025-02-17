# NestQuest Holiday Rentals

## Project Overview

NestQuest is a full stack application designed using MVC(Model-View-Controller) framework to simplify property rentals with a seamless user experience. Using NestQuest users can list, edit and manage their rental properties for travelers or locals looking for unique stays. With secure sign-in, dynamic property locations via integrated map features, review system to rate listings enhancing interaction and engagement, users can explore and post listings with ease. The platform incorporates robust client/server validation, image uploads, and flash messages for clear user feedback. Built to showcase full-stack expertise, NestQuest ensures reliability and ease for both hosts and travelers.

## Key Features

- **CRUD Operations for Listings:** Provides complete control over property listings with Create, Read, Update, and Delete functionalities.
- **Review System:** The review system enables users to submit and remove feedback on listings, helping renters make informed decisions and enhancing community engagement.
- **Image Upload Functionality:** Allows listing owners to upload and edit high-quality images, providing visually engaging listings to potential renters.
- **Interactive Real-Time Location:** Integrated interactive maps using external APIs to display precise property locations and nearby amenities, enhancing user experience with dynamic, real-time location visualization.
- **Secure User Authentication:** Implements robust authentication for secure SignUp, Login, and Logout, using industry-standard techniques.
- **Data Security:** Safeguards sensitive user information using advanced hashing and encryption methods and advanced session management.
- **User Authorisation:** The authorization functionality ensures that only registered users can rent/list properties or create reviews. And only listing owners have the privilege to modify or delete their properties ensuring data integrity and secure access.

## Architecture, Technologies & Packages Used

### Architecture
- **MVC Pattern**: Structured the application with the MVC (Model-View-Controller) framework, making the code clean, enhancing modularity and scalability.

### Frontend, Backend & Database
- **EJS**: Embedded JavaScript templates for dynamic content rendering.
- **Connect Flash**: Middleware for flashing success and error messages, improving user feedback.
- **Node.js**: JavaScript runtime environment for server side development.
- **Express.js**: Web application framework for Node.js, providing robust features for high-performance.
- **MongoDB**: NoSQL database for ensuring efficient data handling for property listings, reviews, and user data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

### Authentication & Environment Management
- **Passport.js**: Authentication middleware for implementing secure user authentication.
- **Passport Local**: Local authentication strategy.
- **Passport Local Mongoose**: Package for simplifying integration with Mongoose for secure password management.
- **Dotenv**: Manages environment variables, ensuring sensitive configuration data remains secure.

### File Uploads, Image Storage & Mapping
- **Multer**: Middleware for handling multipart/form-data, enabling efficient file uploads.
- **Cloudinary**: Cloud storage for storing and handling high quality image uploads for listings.
- **Mapbox**: Mapping API for integrating interactive maps, providing real-time location visualization.

### Session Management
- **Connect Mongo & Express Session**: For effective session management and Handling.
- **Cookie Parser**: Parses cookie headers, facilitating secure cookie management for session handling.

### Data Validation
- **Joi**: Schema validation library for validating server-side data, ensuring API requests are compliant, secure, and efficient, ideal for testing tools like Postman and Hoppscotch.
