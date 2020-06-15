import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './feedback.style.css';
import { connect } from 'react-redux';

// const playerName = JSON.parse(localStorage.getItem('state')).player.name;
// // const playerEmail = JSON.parse(localStorage.getItem('state')).player.gravatarEmail;
// const playerScore = JSON.parse(localStorage.getItem('state')).player.score;
// const playerAnswers = JSON.parse(localStorage.getItem('state')).player
//   .assertions;
// const ranking = JSON.parse(localStorage.getItem('ranking'));

// // const playerGravatar = ranking.find((player) => player.name === playerName)
// //   .picture;

// console.log(localStorage);

const renderButtons = () => (
  <div>
    <div>
      <Link to="/ranking">
        <button
          type="button"
          className="feedback-button-ranking"
          data-testid="btn-ranking"
        >
          VER RANKING
        </button>
      </Link>
    </div>
    <div>
      <Link to="/">
        <button
          type="button"
          className="feedback-button-playagain"
          data-testid="btn-play-again"
        >
          JOGAR NOVAMENTE
        </button>
      </Link>
    </div>
  </div>
);

const feedbackPos = () => (
  <div>
    <h1 data-testid="feedback-text">Mandou bem!</h1>
  </div>
);

const feedbackNeg = () => (
  <div>
    <h1 data-testid="feedback-text">Podia ser melhor...</h1>
  </div>
);

const renderScore = (playerAnswers, playerScore) => (
  <div>
    <h2 data-testid="feedback-total-question">{`Questões certas: ${playerAnswers}`}</h2>
    <h2 data-testid="feedback-total-score">{`Um total de ${playerScore} pontos!`}</h2>
  </div>
);

const renderFeedbackScreen = (playerAnswers, playerScore) => (
  <div>
    {playerAnswers < 3 ? feedbackNeg() : feedbackPos()}
    {renderScore(playerAnswers, playerScore)}
  </div>
);

const renderHeaderScore = (playerName, playerScore, playerPicture) => (
  <header className="feedback-header">
    <div style={{ display: 'flex' }}>
      <img
        data-testid="header-profile-picture"
        className="player-profile-img-header"
        alt="player-profile"
        src={playerPicture}
      />
      <p data-testid="header-player-name">
        Jogador:
        <strong>{playerName}</strong>
      </p>
    </div>
    <div>
      <p data-testid="header-score">
        Pontos:
        <strong>{playerScore}</strong>
      </p>
    </div>
  </header>
);

class Feedback extends Component {
  render() {
    const {
      // eslint-disable-next-line react/prop-types
      playerAnswers, playerName, playerPicture, playerScore,
    } = this.props;
    return (
      <div className="header-container">
        {renderHeaderScore(playerName, playerScore, playerPicture)}
        <div className="score-container">
          {renderFeedbackScreen(playerAnswers, playerScore)}
          {renderButtons()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.playersInfoReducer.username,
  playerScore: parseFloat(state.questionsDataReducer.points),
  playerAnswers: state.questionsDataReducer.assertions,
  playerPicture: state.gravatarReducer.picture.url,
});


export default connect(mapStateToProps)(Feedback);
