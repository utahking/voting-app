import {Map} from 'immutable';

function setState(state, newState){
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if(currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

function resetState(currentRound, state){
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair']);
  const nextRound = state.getIn(['vote', 'votingRound']);
  
  if(hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return resetState(state.getIn(['vote', 'votingRound']), setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry); 
  }
  return state;
}