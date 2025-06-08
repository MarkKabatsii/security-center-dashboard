I chose to implement all server requests in a single api.ts file for the following reasons:

Simplicity for Mock Data: For a small project with mock data, this is very convenient. All data and request simulations are in one place, making them easier to review and modify.
Development Speed: No need to create multiple files for each resource type at the initial stage.
Centralized Management of Delays/Errors: It's easy to simulate network delays or errors for all requests from a single location.
Scalability (with a caveat): While this approach might become problematic for a large project, it’s acceptable for our technical requirements, where the backend isn’t ready yet. In a real project, once the API is available, I would switch to a more structured approach (e.g., api/dashboard.ts, api/logs.ts, or using tools like RTK Query or React Query, which have their own architectural solutions).