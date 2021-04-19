import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import serviceApi from "../../service/serviceApi";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Card,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Checkbox,
  Button,
  CardContent,
  CardActions,
} from "@material-ui/core";
const Home = (props) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    genres: [],
    artists: [],
    artistIds: [],
    startDate: "",
    endDate: "",
  });
  /**
   * @name useEffect
   * @description It is used to make get call for Geners
   * Which is then store in the genre state
   * It executes only once
   */
  useEffect(() => {
    serviceApi()
      .getGenres()
      .then((res) => res.json())
      .then((data) => {
        const genres = data.genres.map((genre) => {
          genre.checked = false;
          return genre;
        });
        setGenres([...genres]);
      });
  }, []);

  /**
   * @name useEffect
   * @description It is used to make get call for Artists
   * Which is then store in the artists state
   * It executes only once
   */
  useEffect(() => {
    serviceApi()
      .getArtists({ page: 1, limit: 10 })
      .then((res) => res.json())
      .then((data) => {
        const artists = data.artists.map((artist) => {
          artist.checked = false;
          return artist;
        });
        setArtists([...artists]);
      });
  }, []);

  /**
   * @name useEffect
   * @description It is used to make get call for Movies
   * Which is then store in the upcommingMovie state
   * It executes only once
   */
  useEffect(() => {
    serviceApi()
      .getMovies({ page: 1, limit: 10 })
      .then((res) => res.json())
      .then((data) => {
        const movies = data.movies.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url,
            release_date: new Date(movie.release_date).toDateString(),
            artists: movie.artists,
            genres: movie.genres,
          };
        });
        setUpcomingMovies(movies);
        setReleasedMovies(movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   * @name onClickMovieHandler
   * @description Navigates to details page with selected id.
   * @param {*} id
   */
  const onClickMovieHandler = (id) => {
    props.history.push("/details/" + id);
  };
  /**
   * @name onFilterHandler
   * @description This function is used to filter the movies
   * based on the fitler options slected by the user.
   * after filter it map the movies to releaseState.
   */
  const onFilterHandler = () => {
    let filteredMovies = upcomingMovies;

    if (filter.name !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.title.toLowerCase() === filter.name.toLowerCase()
      );
    }

    if (filter.genres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.genres.some((genre) => filter.genres.includes(genre));
      });
    }

    if (filter.artistIds.length > 0) {
      filteredMovies = filteredMovies.filter((movie) => {
        if (movie.artists && movie.artists.length > 0) {
          return movie.artists.some((artist) =>
            filter.artistIds.includes(artist.id)
          );
        } else {
          return false;
        }
      });
    }
    if (filter.startDate) {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.release_date >= new Date(filter.startDate).toDateString()
      );
    }
    if (filter.endDate) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.release_date <= new Date(filter.endDate).toDateString()
      );
    }
    setReleasedMovies(filteredMovies);
  };

  /**
   * @name onChangeGenreCheckboxHandler
   * @description It is used to handle the selection of genres in filter
   * @param {*} id
   */
  const onChangeGenreCheckboxHandler = (id) => {
    const index = genres.findIndex((genre) => genre.id === id);
    const newGenres = [...genres];
    newGenres[index].checked = !newGenres[index].checked;
    setGenres(newGenres);
    const selectedGenres = newGenres.filter((genre) => genre.checked === true);
    const mapGenres = selectedGenres.map((genre) => genre.genre);
    setFilter({ ...filter, genres: mapGenres });
  };
  /**
   * @name onChangeArtistCheckboxHandler
   * @description It is used to handle the selection of artists in filter
   * @param {*} id
   */
  const onChangeArtistCheckboxHandler = (id) => {
    const index = artists.findIndex((artist) => artist.id === id);
    const newArtists = [...artists];
    newArtists[index].checked = !newArtists[index].checked;
    setArtists(newArtists);
    const selectedArtists = newArtists.filter(
      (artist) => artist.checked === true
    );
    const mapArtists = selectedArtists.map(
      (artist) => artist.first_name + " " + artist.last_name
    );
    const artistIds = selectedArtists.map((artist) => artist.id);
    setFilter({ ...filter, artists: mapArtists, artistIds: artistIds });
  };
  return (
    <div className="home">
      {/** Header part start */}
      <Header
        baseUrl={props.baseUrl}
        history={props.history}
        loginState={props.loginState}
        bookshow={false}
      />
      {/** Header part end */}
      {/** Upcoming movie part start */}
      <div className="upcoming-movies__heading">Upcoming Movies</div>
      <GridList cellHeight={250} cols={6} className="upcoming-movies__lists">
        {upcomingMovies.map((tile) => (
          <GridListTile key={tile.title}>
            <img
              style={{ height: 250 }}
              src={tile.poster_url}
              alt={tile.title}
            />
            <GridListTileBar
              className="upcoming-movies__list-bar"
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
      {/** Upcoming movie part end */}
      {/** Released movie part start */}
      <div className="released-movies">
        <div className="released-movies__movies">
          <GridList spacing={16} cellHeight={350} cols={4}>
            {releasedMovies.map((tile) => (
              <GridListTile
                key={tile.title}
                onClick={() => onClickMovieHandler(tile.id)}
              >
                <img src={tile.poster_url} alt={tile.title} />
                <GridListTileBar
                  className="released-movies__movie-bar"
                  title={tile.title}
                  subtitle={"Release Date: " + tile.release_date}
                />
              </GridListTile>
            ))}
            <div className="released-movies__filters"></div>
          </GridList>
        </div>
        {/** Released movie part end */}
        {/** Filter movie part start */}
        <div className="released-movies__filters">
          <Card className="released-movies__card">
            <CardContent>
              <Typography color="primary">FIND MOVIES BY:</Typography>
              <FormControl margin="dense">
                <InputLabel htmlFor="name">Movie Name</InputLabel>
                <Input
                  id="name"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl margin="dense" fullWidth={true}>
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Select
                  multiple
                  id="genres"
                  value={filter.genres}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {genres.map((genre) => (
                    <MenuItem value={genre.genre} key={genre.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={genre.checked}
                            onChange={onChangeGenreCheckboxHandler.bind(
                              null,
                              genre.id
                            )}
                            name={genre.id}
                          />
                        }
                        label={genre.genre}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="dense" fullWidth={true}>
                <InputLabel htmlFor="artists">Artists</InputLabel>
                <Select
                  multiple
                  id="artists"
                  value={filter.artists}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      value={artist.first_name + " " + artist.last_name}
                      key={artist.id}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={artist.checked}
                            onChange={onChangeArtistCheckboxHandler.bind(
                              null,
                              artist.id
                            )}
                            name={artist.id}
                          />
                        }
                        label={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="dense">
                <InputLabel htmlFor="startDate" shrink>
                  Release Date Start
                </InputLabel>
                <Input
                  id="startDate"
                  type="date"
                  value={filter.startDate}
                  onChange={(e) =>
                    setFilter({ ...filter, startDate: e.target.value })
                  }
                />
              </FormControl>
              <FormControl margin="dense">
                <InputLabel htmlFor="endDate" shrink>
                  Release Date End
                </InputLabel>
                <Input
                  id="endDate"
                  type="date"
                  value={filter.endDate}
                  onChange={(e) =>
                    setFilter({ ...filter, endDate: e.target.value })
                  }
                />
              </FormControl>
            </CardContent>
            <CardActions>
              <div style={{ width: "100%" }}>
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                  onClick={onFilterHandler}
                >
                  Apply
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
        {/** Filter movie part end */}
      </div>
    </div>
  );
};

export default Home;
