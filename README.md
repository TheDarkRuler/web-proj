# Artify - Social Media for Artists

Welcome to Artify! Artify is a social media platform designed specifically for artists to connect, share their work, and engage with other members of the artistic community.

## Features

- **Profile Creation**: Create your unique artist profile to showcase bio, and other relevant information.
- **Artwork Upload**: Share your artwork with the community by uploading images or videos directly to your profile.
- **Discover**: Explore a diverse range of artworks and artists from around the world. Discover new talent and get inspired.
- **Interact**: Like and comment artworks to engage with fellow artists and enthusiasts.
- **Messaging**: Connect with other artists through direct messaging. Share feedback, collaborate on projects, or simply chat about art.

## Getting Started

1. Sign up for an Artify account.
2. Complete your profile and personalize it with your portfolio and bio.
3. Start uploading your artwork to share with the community.
4. Explore, interact, and connect with fellow artists.

## Contributing

Artify is an open-source project, and we welcome contributions from the community. Whether it's through code contributions, feature suggestions, or bug reports, your contributions help make Artify better for everyone. Visit our GitHub repository at [TheDarkRuler/web-proj](https://github.com/TheDarkRuler/web-proj) to get involved.

## License

Artify is licensed under the MIT License. See the LICENSE file for more information.

## Usage

### Clone repository

firstly clone the repository by running:

```bash
git clone https://github.com/TheDarkRuler/web-proj.git
```

### Run locally

After cloning the repository run:

```bash
cd web-proj
```

to enter the root folder of the application.

To run the social network locally on your device you can run the docker container created by building and then running it:

```bash
docker compose build
```
```bash
docker compose up
```

Otherwise you can use XAMPP and set it up manually as you wish. 

The database will be populated with some mockup data to test it, as this repo is a testing version of the actual social media.

PS: be sure to have the port 41062 free when running the docker image (you can change it in the compose.yml file).
### Access the social media
After the docker image is running just open [http://localhost:41062/www/frontend/index.html](http://localhost:41062/www/frontend/index.html) <br>
and enjoy!!