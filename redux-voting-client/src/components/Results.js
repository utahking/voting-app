import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Tally from './Tally';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

export default class Results extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return (
      this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <Tally pair={this.props.pair} tally={this.props.tally} />
          
        <div className="management">
          <button ref="next"
                  className="next"
                  onClick={this.props.next}>
            Next
          </button>
        </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    votingRound: state.getIn(['vote', 'votingRound']),
    winner: state.get('winner')
  };
}

//export const Results;

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);