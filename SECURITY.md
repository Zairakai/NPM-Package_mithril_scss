# Security Policy

> This project follows the [Zairakai Global Security Policy][handbook-security].  
> Please refer to it for standard protections, response timeline, and contact information.

---

## 🔒 Reporting Vulnerabilities

| Channel | Description | Contact / Link |
| :--- | :--- | :--- |
| **GitLab Issues** | For non-sensitive issues (bugs, public vulnerabilities). | [Open Issue][issues] |
| **Email** | Alternative secure contact. | `security@the-white-rabbits.fr` |

Please **do not disclose vulnerabilities publicly** until they have been reviewed.

---

## 🛡️ Security Features

### Protection Layers

| Layer | Security Protection |
| :--- | :--- |
| **Static Analysis** | Stylelint with strict ruleset. |
| **CI Pipeline** | Automated secret detection in GitLab CI. |

---

## 🔍 Security Scope

`@zairakai/mithril-scss` provides a modular SCSS framework (grid, spacing, mixins):

- no JavaScript — purely SCSS/CSS output
- no external network calls at any stage
- no dynamic code execution

Security considerations apply only to consuming applications rendering content styled with this framework.

---

[handbook-security]: https://gitlab.com/zairakai/handbook/-/blob/main/SECURITY.md
[issues]: https://gitlab.com/zairakai/npm-packages/mithril-scss/-/issues
