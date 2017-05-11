import { fork } from 'redux-saga/effects';
import bqSaga from './bq.saga';

export default function* mainSaga() {
  yield fork(bqSaga);
}
