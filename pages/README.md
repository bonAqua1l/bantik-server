# Purpose of the `pages` Folder

This folder exists to **prevent conflicts** between Next.js routing conventions and the project's custom folder structure, which follows the **Feature-Sliced Design (FSD)** architecture.

## Why is this folder necessary?

- **Next.js Routing:** The `pages` directory is a special folder in Next.js that automatically generates routes. Without it, Next.js may throw errors or fail to build.
- **FSD Architecture:** In this project, the `pages` name is used as a feature layer, which conflicts with Next.js routing behavior.

## How does this solve the problem?

To avoid conflicts:
1. The official Next.js `app` directory has been moved to the same level as `src`.
2. A placeholder `pages` folder has been created to satisfy Next.js's routing requirements.

## Notes

- This folder **should remain empty** and should not contain any routing logic or components.
- The `README.md` file is included to explain the folder's existence.
