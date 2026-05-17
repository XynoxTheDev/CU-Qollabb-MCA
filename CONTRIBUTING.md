# Contributing

Contributions are welcome. To get your PR merged without back-and-forth:

1. **Fork** the repository and clone your fork locally.
2. **Create a branch** using Conventional Commits naming:
   ```bash
   git checkout -b feature/your-feature
   # or
   git checkout -b fix/your-fix
   ```
3. **Commit** using Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, etc.).
4. **Run checks** before pushing:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run test:run
   npm run build
   ```
5. **Open a PR** against `main` with a clear description of what changed and why.

> [!NOTE]
> Issues and feature requests are tracked via [GitHub Issues](https://github.com/XynoxTheDev/CU-Qollabb-MCA/issues).
