# FullStack TypeScript Test

## Purpose
The purpose of this task is to evaluate your ability to design and implement a simple full-stack program that interacts with a public API. During the interview, we will review your code and ask you questions about your implementation, so please be prepared to discuss your design choices, any challenges you faced, and how you overcame them. We will be looking for clean, maintainable code that follows best practices, as well as your ability to explain your choices and think critically about the problem.

For more information on what we will be looking for at each level, please see the following links:
- [Junior Developers](#junior-developers)
- [Mid-Level Developers](#mid-level-developers)
- [Senior Developers](#senior-developers)

## Task Description

Create a simple full-stack program that allows users to search for and save data from a public API of your choice. The program should have a RESTful API and a web client.

### API Requirements

The API should be built using Node.js and Express, and use a public API from the following list: https://github.com/public-apis/public-apis. It should have the following endpoints:

- `GET /api/{resource}?q={query}`: returns an array of results from the public API that match the search query.
- `POST /api/favorites`: adds a result to the user's favorites list.
- `GET /api/favorites`: returns the user's favorites list.
- `DELETE /api/favorites/:id`: removes a result from the user's favorites list.

The `POST /api/favorites` endpoint should store the user's favorite results in a database of their choice. You may choose to use a SQL or NoSQL database, or any other database technology you prefer.

### Web Client Requirements

The web client should be built using React and use the API to interact with the server. It should have the following features:

- A search bar where users can enter a search query and see a list of matching results.
- A way to save results to a "favorites" list.
- A way to view and remove results from the "favorites" list.

## Notes for Candidates

The focus of this task is not just on writing functional code, but also on your ability to explain and defend your decisions, think critically about the problem, and adhere to best practices in your code. During the interview, we will be looking for clean, maintainable code that follows best practices and is scalable. We encourage you to discuss your thought process and approach to the problem, as well as any challenges you faced and how you overcame them.

While the web client should be functional and easy to use, it does not need to have a polished or elaborate design. During the interview, you will be evaluated based on your ability to structure the client-side code to make it modular, maintainable, and testable. You should also consider how to handle state management, routing, and API interactions in a way that maximizes performance and user experience. We encourage you to discuss your approach to testing and debugging your code, as well as any best practices or design patterns you would use to ensure high-quality and scalable code.

## Assessment

### Junior Developers

During the interview, we may discuss the following topics related to your implementation of the project:

- The reasoning behind your choice of public API and database technology
- How you approached designing and implementing the API endpoints and the web client features.
- How you handled errors and edge cases in your code.
- How you tested your code and ensured its correctness.
- How you would go about adding additional features to the project and scaling it to handle more users.

### Mid-Level Developers
During the interview, we may discuss the following topics related to your implementation of the project:

The reasoning behind your choice of public API and database technology, and how you would handle different use cases and performance requirements.
- How you designed and implemented the API endpoints and the web client features in a modular and maintainable way, and how you handled errors and edge cases.
- How you ensured or would ensure the quality and correctness of your code through testing, linting, and code review.
- How you would go about optimizing the performance and scalability of the project, and how you would handle security concerns such as authentication and data validation.

### Senior Developers
During the interview, we may discuss the following topics related to your implementation of the project:

- The reasoning behind your choice of public API and database technology, and how you would handle different use cases and performance requirements at scale.
- How you designed and implemented the API endpoints and the web client features in a way that maximizes performance, maintainability, and testability, and how you handled errors and edge cases.
- How you ensured or would ensure the quality and correctness of your code through testing, code review, and other best practices.
- How you would go about designing and implementing highly scalable and performant database systems, and how you would handle security concerns such as authentication, authorization, and data privacy.
- How you would handle more complex scenarios such as real-time updates, caching, and multi-region deployments.

## Delivery

Once you have completed the task, please follow these steps:
1. Fork the original repository.
2. Email the link to your forked repository to tyler@mappingindustries.com.
3. Ensure that your code is properly documented, and include a README.md file with instructions on how to run your code.
4. Create a pull request to the original repository.

## Conclusion
We hope this task gives you an opportunity to demonstrate your skills as a full-stack developer and showcase your creativity, problem-solving abilities, and best practices in your code. We look forward to seeing your completed task and discussing your approach and thought process during the interview. Good luck!
