<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Instructor Matched</h3>

  <p align="center">
    A full-stack marketplace connecting learner drivers with local, verified driving instructors.
    <br />
    <a href="https://github.com/emlynphoenix/instructor-matched"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/emlynphoenix/instructor-matched/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/emlynphoenix/instructor-matched/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Instructor Matched is a full-stack marketplace connecting learner drivers with driving instructors. Instructors create profiles listing their availability, pricing, teaching style and ADI qualification. Students search for instructors by postcode and request contact with those covering their area.

Key features:
* **Postcode-based search** — students find instructors covering their local area
* **ADI badge verification** — instructors upload proof of qualification, and unverified instructors are excluded from search results entirely
* **Credit-based monetisation** — instructors purchase credits and spend one to approve each student contact request, charging for access to incoming leads rather than a flat listing fee
* **Firebase Authentication** — separate account flows for students and instructors

The initial site structure was scaffolded using the Gemini API, with the data model, matching/filtering logic, auth flow and monetisation system built out independently from there.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![TypeScript][TypeScript.com]][TypeScript-url]
* [![Vite][Vite.com]][Vite-url]
* [![Firebase][Firebase.com]][Firebase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js and npm
  ```sh
  npm install npm@latest -g
  ```
* A Firebase project with Firestore and Authentication enabled
* A Gemini API key

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/emlynphoenix/instructor-matched.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env.local` file in the project root and add your keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```
4. Run the app
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

1. Create an account as either a **student** or an **instructor**
2. Instructors complete their profile — availability, pricing, teaching description, location and ADI badge upload for verification
3. Students search for instructors by postcode and request contact with any that cover their area
4. Instructors approve incoming requests by spending a purchased credit, after which contact details are shared

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Deploy to production
- [ ] Add instructor reviews/ratings
- [ ] Add in-app payment for credit purchases

See the [open issues](https://github.com/emlynphoenix/instructor-matched/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

This is currently a personal project, but suggestions are welcome — feel free to open an issue with the tag "enhancement" or fork the repo and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Emlyn Phoenix - emlynphoenix1@gmail.com

Project Link: [https://github.com/emlynphoenix/instructor-matched](https://github.com/emlynphoenix/instructor-matched)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/emlynphoenix/instructor-matched.svg?style=for-the-badge
[contributors-url]: https://github.com/emlynphoenix/instructor-matched/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/emlynphoenix/instructor-matched.svg?style=for-the-badge
[forks-url]: https://github.com/emlynphoenix/instructor-matched/network/members
[stars-shield]: https://img.shields.io/github/stars/emlynphoenix/instructor-matched.svg?style=for-the-badge
[stars-url]: https://github.com/emlynphoenix/instructor-matched/stargazers
[issues-shield]: https://img.shields.io/github/issues/emlynphoenix/instructor-matched.svg?style=for-the-badge
[issues-url]: https://github.com/emlynphoenix/instructor-matched/issues
[license-shield]: https://img.shields.io/github/license/emlynphoenix/instructor-matched.svg?style=for-the-badge
[license-url]: https://github.com/emlynphoenix/instructor-matched/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/emlyn-phoenix
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite.com]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Firebase.com]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
