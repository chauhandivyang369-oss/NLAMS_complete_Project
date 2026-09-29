# NLAMS Master Demo Accounts

This document contains the **verified master/demo login accounts** configured for the **NLAMS (National Land Acquisition & Transparency Portal)** project.

> **Demo / Development Credentials:** These accounts are intended for project demonstration, testing, and development purposes.

---

## 🔐 Master Login Accounts

| # | Master Account Role | Login Email ID | Password | Target Workspace | Status |
|---:|---|---|---|---|---|
| 1 | **District Collector / DM** | `collector.ahmedabad@gov.in` | `Admin@123` | **Master District Collector** | ✅ **VERIFIED** |
| 2 | **Central Appropriate Govt** | `nodal.central@dolr.gov.in` | `Admin@123` | **Central Appropriate Govt** | ✅ **VERIFIED** |
| 3 | **State Appropriate Govt** | `sec.revenue@gujarat.gov.in` | `Admin@123` | **State Appropriate Govt** | ✅ **VERIFIED** |
| 4 | **Requiring Body (DFCCIL)** | `pd.wdfc@dfccil.gov.in` | `Admin@123` | **Requiring Body** | ✅ **VERIFIED** |
| 5 | **Policy Maker / Executive** | `policy.director@gov.in` | `Admin@123` | **Policy Maker** | ✅ **VERIFIED** |
| 6 | **SIA & IEG Evaluation** | `ieg.chairperson@accred.org` | `Admin@123` | **SIA & IEG Evaluation** | ✅ **VERIFIED** |
| 7 | **R&R Commissioner** | `rnr.commissioner@gov.in` | `Admin@123` | **R&R Authority** | ✅ **VERIFIED** |
| 8 | **LARR Judicial Tribunal** | `larr.judge@judicial.gov.in` | `Admin@123` | **LARR Authority** | ✅ **VERIFIED** |
| 9 | **Recorded Landowner** | `khatedar.ramesh@gmail.com` | `Admin@123` | **Citizen Portal** | ✅ **VERIFIED** |
| 10 | **Multi-Workspace Officer** | `multi.officer@gov.in` | `Admin@123` | **Multi-Workspace Modal** | ✅ **VERIFIED** |

---

## 🚀 Login Instructions

1. Open the NLAMS login page.
2. Enter the required **Login Email ID**.
3. Enter the corresponding **Password**.
4. Click **Login**.
5. The system should route the user to the corresponding target workspace.
6. The **Multi-Workspace Officer** account can be used to demonstrate switching between authorized workspaces.

---

## 🏢 Workspace Mapping

| # | Account | Workspace |
|---:|---|---|
| 1 | District Collector / DM | **Master District Collector** |
| 2 | Central Appropriate Govt | **Central Appropriate Govt** |
| 3 | State Appropriate Govt | **State Appropriate Govt** |
| 4 | Requiring Body (DFCCIL) | **Requiring Body** |
| 5 | Policy Maker / Executive | **Policy Maker** |
| 6 | SIA & IEG Evaluation | **SIA & IEG Evaluation** |
| 7 | R&R Commissioner | **R&R Authority** |
| 8 | LARR Judicial Tribunal | **LARR Authority** |
| 9 | Recorded Landowner | **Citizen Portal** |
| 10 | Multi-Workspace Officer | **Multi-Workspace Modal** |

---

## ✅ Account Status

All accounts listed above are currently marked as:

**✅ VERIFIED**

These accounts are intended to demonstrate the different role-based workspaces and access flows available within NLAMS.

---

## 🔒 Security Note

> **Important:** These credentials are intended for **demo/development purposes only**.

For production deployment:

- Store passwords as secure hashes.
- Never commit production passwords to GitHub.
- Use environment variables or a secure secrets manager.
- Rotate all demo/default passwords before production deployment.
- Disable or remove demo accounts when they are no longer required.
- Enforce server-side RBAC and authorization.
- Do not expose privileged production credentials in a public repository.

---

## 📌 NLAMS Role Flow

```text
User
  ↓
Login
  ↓
Authentication
  ↓
Account / Designation
  ↓
Workspace Assignment
  ↓
RBAC Permission Check
  ↓
Jurisdiction Scope
  ↓
Project Scope
  ↓
Authorized NLAMS Workspace
