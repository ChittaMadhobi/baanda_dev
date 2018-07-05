import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  // If someone use URL host:port/login ... it should not take to login if already so
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Baanda</h1>
                <p className="lead">
                  {' '}
                  A society forged with cooperation among peers
                </p>
                <hr />
                <Link to="/chatromm" className="btn btn-lg btn-info mr-2">
                  Wanna Chat
                </Link>
                <Link to="/lobby" className="btn btn-lg btn-light">
                  The Lobby
                </Link>

                <br />
                <br />
                <p>
                  <h6>
                    <i>Please login or register to get to the lobby</i>{' '}
                  </h6>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Landing.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(Landing);

export default Landing;
