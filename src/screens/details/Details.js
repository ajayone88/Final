import React, { useEffect, useState } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import {
  Typography,
  GridListTileBar,
  GridListTile,
  Link,
  GridList,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import serviceApi from "../../service/serviceApi";
import YoutTube from "react-youtube";
const Details = (props) => {
  // Options for youtube
  const youTubeOptions = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [star, setStar] = useState([false, false, false, false, false]);
  const [currentMovie, setMovie] = useState({
    title: "",
    genres: [],
    duration: "",
    release_date: new Date("2014-01-01").toDateString(),
    rating: "",
    storyline: "",
    trailer: "",
    artists: [],
  });
  /**
   * @name useEffect
   * @description It is used to get the movie by passing the id
   * it is triggered only when page loads
   */
  useEffect(() => {
    const id = props.match.params["id"];
    serviceApi()
      .getMovie({ id: id })
      .then((res) => res.json())
      .then((data) => {
        data.release_date = new Date(data.release_date).toDateString();
        data.videoId = data.trailer_url.split("=").pop();
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  /**
   * @name onClickBookshowHandler
   * @description navigates to bookshow page.
   */
  const onClickBookshowHandler = () => {
    props.history.push("/bookshow/" + currentMovie.id);
  };
  /**
   * @name videoOnReadyHandler
   * @description Used by youtube component to pauseVideo.
   */
  const videoOnReadyHandler = (e) => {
    e.target.pauseVideo();
  };
  /**
   * @name onClickStarHandler
   * @description It is used to change the color of star when user selected its.
   */
  const onClickStarHandler = (index) => {
    const newStar = [...star];
    for (let i = 0; i < 5; i++) {
      newStar[i] = true;
    }
    for (let j = 4; j > index; j--) {
      newStar[j] = false;
    }
    setStar(newStar);
  };
  return (
    <div>
      {/** Header Part Start */}
      <Header
        baseUrl={props.baseUrl}
        history={props.history}
        loginState={props.loginState}
        bookshow={true}
        onClickBookshowHandler={onClickBookshowHandler}
      />
      {/** Header Part End */}
      <div className="back-button">
        <Typography onClick={() => props.history.push("/")}>
          {"<"} Back Button
        </Typography>
      </div>
      <div className="details__container">
        {/** Image Part Start */}
        <div className="left">
          <div>
            <img
              className="movie-image"
              src={currentMovie.poster_url}
              alt="movies"
            />
          </div>
        </div>

        {/** Trailer Part Start */}
        <div className="middle">
          <Typography variant="headline" component="h2">
            {currentMovie.title}
          </Typography>
          <Typography variant="body1" component="h5">
            <b>Genres: </b> {currentMovie.genres.join(",")}
          </Typography>
          <Typography variant="body1" component="h5">
            <b>Duration: </b> {currentMovie.duration}
          </Typography>
          <Typography variant="body1" component="h5">
            <b>Release Date: </b> {currentMovie.release_date}
          </Typography>
          <Typography variant="body1" component="h2">
            <b>Rating: </b> {currentMovie.rating}
          </Typography>
          <Typography variant="body1" component="h2" style={{ marginTop: 16 }}>
            <b>Plot: </b>(
            <Link
              href={currentMovie.wiki_url}
              target="_blank"
              color="primary"
              onClick={(e) => e.preventDefault}
            >
              Wiki Link
            </Link>
            ) {currentMovie.storyline}
          </Typography>
          <Typography variant="body1" component="h2" style={{ marginTop: 16 }}>
            <b>Trailer: </b>
          </Typography>
          <YoutTube
            videoId={currentMovie.videoId}
            opts={youTubeOptions}
            onReady={videoOnReadyHandler}
          />
        </div>
        {/** Rating Part Start */}
        <div className="right">
          <Typography variant="h6" component="h2">
            <b>Rate this movie:</b>
          </Typography>
          {star.map((item, index) => (
            <StarBorderIcon
              key={index}
              style={item === true ? { color: "yellow" } : { color: "black" }}
              fontSize="small"
              onClick={() => onClickStarHandler(index)}
            />
          ))}
          <Typography
            style={{ marginTop: 16, marginBottom: 16 }}
            variant="headline"
            component="h2"
          >
            Artists:
          </Typography>
          {currentMovie.artists ? (
            <GridList cellHeight={250} col={2}>
              {currentMovie.artists.map((artist) => (
                <GridListTile key={artist.id}>
                  <img
                    className="artist-image"
                    src={artist.profile_url}
                    alt={artist.first_name}
                  ></img>
                  <GridListTileBar
                    title={artist.first_name + " " + artist.last_name}
                  />
                </GridListTile>
              ))}
            </GridList>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Details;
