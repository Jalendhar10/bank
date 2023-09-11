# Use npm

# Run server

For local server execution, ensure that you include the necessary variables in the .env file that are mentioned in src/config/config.ts and specify the exact versions of engines as indicated in the package.json.
Additionally, install the suggested extensions from the extensions menu in Visual Studio Code by searching for '@recommended'.

Once the above steps are completed:

Install the required dependencies using the command 'npm i'.
To initiate the server, utilize the command 'npm run dev'.

# Commiting the code

You can use 'npm run commit' for commiting the code.
<OR>
You can commit manually by following the below rules:

1. Begin with the type of change and the module: type(module)

   - Types: 'feat' (new feature), 'fix' (bug fix), 'docs' (documentation), 'style' (code style changes), 'refactor' (code improvement), 'test' (adding tests), 'revert' (reverting a previous commit).

2. After that, write a short and clear message about your changes.

For example:

- feat(user-auth): Added new user authentication feature.
- fix(order-module): Fixed issue with order processing.

This helps maintain consistency and makes it easier to understand the purpose of each commit.
