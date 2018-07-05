import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Talk from '../../img/talk2.jpg';
import Nook from '../../img/nook1.jpg';
import ServiceXchange from '../../img/servicex1.jpg';
import Marketing from '../../img/marketing1.jpg';
import Copyright from '../../img/copyright2.jpg';
import FinTech from '../../img/finance1.jpeg';
import Healthcare from '../../img/healthcare1.jpg';
import Cooperation from '../../img/cooperation1.jpg';

class Lobby extends Component {
  render() {
    return (
      <div className="lobby">
        <div className="lobbyheader">
          <div className="row text-center text_blue">
            <div className="col-12">
              <div className="headerpic">
                <span className="align-baseline-middle">
                  <h1>Baanda Lobby</h1>
                </span>
                <span className="align-baseline-middle">
                  <h4>The P2P Bazzar for a cooperation based society</h4>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="row text-center">
          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={Talk} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Intro-Chats & Library</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={Nook} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Your Nook</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={ServiceXchange} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Co-op Service Xchange</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={Marketing} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Messaging & Influencing</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={Copyright} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Copyright digital creation</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={FinTech} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">FinTech for Cooperation</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={Healthcare} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Individualized HealthCare</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-xs-4">
            <div class="thumbnail">
              <img src={Cooperation} alt="" />
              <div class="caption">
                <p />
                <h6 class="text-center">Cooperative Life</h6>
                <div class="btn-group btn-trigger">
                  <a href="" class="btn btn-info btn-sm">
                    Enter & Explore
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
