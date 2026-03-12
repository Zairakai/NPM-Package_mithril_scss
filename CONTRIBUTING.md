# Contributing

> This project follows the [Zairakai Global Contributing Guide][handbook-contributing].  
> Please read it before contributing. The sections below document project-specific workflow.

---

## Development Workflow

| Step | Command / Action | Description |
| :--- | :--- | :--- |
| **1. Install** | `npm install` | Install dependencies and set up git hooks. |
| **2. Branch** | `git checkout -b feature/#TICKET-name` | Create a feature branch from `main`. |
| **3. Code** | *(your IDE)* | Implement your changes following quality standards. |
| **4. Quality** | `make quality` | Run the full quality gate. |
| **5. Test** | `make test` | Ensure all tests are passing. |
| **6. Commit** | `git commit -m "type(scope): #TICKET subject"` | Use [Conventional Commits][git-rules] format. |
| **7. Push** | `git push origin feature/#TICKET-name` | Push and open a Merge Request to `main`. |

---

## Types of Contributions

| Type | Guidelines |
| :--- | :--- |
| **🐛 Bug Reports** | Use the issue template. Include minimal reproduction steps, browser/Node.js version, and SCSS compiler version. |
| **✨ Feature Requests** | Describe the use case. Must fit the scope (grid, spacing, typography, responsive utilities). |
| **📐 Grid System** | In `src/grid.scss`. Follow mobile-first BEM approach. Keep breakpoints consistent with `src/variables.scss`. |
| **📏 Spacing / Variables** | In `src/spacing.scss` and `src/variables.scss`. Keep naming stable — breaking changes require major bump. |
| **🎨 Mixins / Functions** | In `src/mixins.scss` and `src/functions.scss`. Document input/output. Export from `src/index.scss`. |
| **🧩 New Modules** | Follow BEM naming convention. Add to `src/index.scss`. Include compile test in `tests/unit/`. |

---

## Quality Targets

| Command | Tool | Description |
| :--- | :--- | :--- |
| `make quality` | All | Full quality gate (stylelint, prettier, tests). |
| `make stylelint` | Stylelint | SCSS linting. |
| `make prettier` | Prettier | Code formatting check. |
| `make test` | Vitest | Run compile and unit tests. |
| `make markdownlint` | Markdownlint | Validate Markdown documentation. |

---

[handbook-contributing]: https://gitlab.com/zairakai/handbook/-/blob/main/CONTRIBUTING.md
[git-rules]: https://gitlab.com/zairakai/handbook/-/blob/main/policies/git-rules.md
