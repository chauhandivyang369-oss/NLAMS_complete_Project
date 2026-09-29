NLAMS Master Demo Accounts

This document contains the verified master/demo login accounts configured for the NLAMS (National Land Acquisition & Transparency Portal) project.

Demo / Development Credentials: These accounts are intended for project demonstration, testing, and development purposes.

#

Master Account Role

Login Email ID

Password

Target Workspace

Status

1

District Collector / DM

collector.ahmedabad@gov.in

Admin@123

Master District Collector

✅ VERIFIED

2

Central Appropriate Govt

nodal.central@dolr.gov.in

Admin@123

Central Appropriate Govt

✅ VERIFIED

3

State Appropriate Govt

sec.revenue@gujarat.gov.in

Admin@123

State Appropriate Govt

✅ VERIFIED

4

Requiring Body (DFCCIL)

pd.wdfc@dfccil.gov.in

Admin@123

Requiring Body

✅ VERIFIED

5

Policy Maker / Executive

policy.director@gov.in

Admin@123

Policy Maker

✅ VERIFIED

6

SIA & IEG Evaluation

ieg.chairperson@accred.org

Admin@123

SIA & IEG Evaluation

✅ VERIFIED

7

R&R Commissioner

rnr.commissioner@gov.in

Admin@123

R&R Authority

✅ VERIFIED

8

LARR Judicial Tribunal

larr.judge@judicial.gov.in

Admin@123

LARR Authority

✅ VERIFIED

9

Recorded Landowner

khatedar.ramesh@gmail.com

Admin@123

Citizen Portal

✅ VERIFIED

10

Multi-Workspace Officer

multi.officer@gov.in

Admin@123

Multi-Workspace Modal

✅ VERIFIED

Login Instructions

Open the NLAMS login page.

Enter the required account email ID and password.

Sign in.

The system should route the user to the corresponding target workspace.

The Multi-Workspace Officer account is intended to demonstrate switching between authorized workspaces.

Workspace Mapping

Account

Workspace

District Collector / DM

Master District Collector

Central Appropriate Govt

Central Appropriate Govt

State Appropriate Govt

State Appropriate Govt

Requiring Body (DFCCIL)

Requiring Body

Policy Maker / Executive

Policy Maker

SIA & IEG Evaluation

SIA & IEG Evaluation

R&R Commissioner

R&R Authority

LARR Judicial Tribunal

LARR Authority

Recorded Landowner

Citizen Portal

Multi-Workspace Officer

Multi-Workspace Modal

Security Note

These credentials are suitable for a demo/development README only and should not be used as production credentials.

For production deployment:

Store passwords as secure hashes; never commit plaintext passwords.

Use environment variables or a secrets manager.

Rotate all demo/default passwords.

Disable or remove demo accounts when no longer required.

Enforce server-side RBAC and authorization.

Do not expose privileged credentials in a public production repository.
