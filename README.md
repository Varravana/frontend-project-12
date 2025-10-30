### Hexlet tests and linter status:
[![Actions Status](https://github.com/Varravana/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Varravana/frontend-project-12/actions)

# Training project No. 4 "Chat (Slack)" in the "Front-end developer" program
A graduation project, which is a simplified version of Slack chat. The project demonstrates the implementation of the following tasks faced by frontend and React developers:
* working with web sockets
* interacting with the REST API
* using React (with hooks)
* state management using Redux Toolkit
* client-side routing, authorization and authentication
* internationalization (i18n)
* profanity filtering
* monitoring of production errors (Rollbar)
* building and deployment (Vite)

### Setup

```bash
make install
```
### Build

```bash
make build
```
### Start

```bash
make start
```


## Deployment
The project is published on the [Render](https://render.com/). You can view the project by following the link:
https://frontend-project-12-1-rnx4.onrender.com

## The following methods were used in the work on the project:
* Redux Toolkit for organizing slices and storage
* react-i18next for Internationalization
* leo-profanity - library for filtering obscene words in channel names and chat messages
* Rollbar service for React for error tracking
* Vite - frontend builder
* yup - for validating form data
* Axios - library for executing http requests
* Formik - for creating forms
* React Router - for routing React pages
* React Bootstrap - for displaying interface elements
* Socket.IO - to update the message display and channel list
* react-toastify - for pop-up notifications(toast)
* Render - for viewing project publications
