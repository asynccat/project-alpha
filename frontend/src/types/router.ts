import * as H from 'history'
import {History} from 'history'

export interface IWithHistory {
  history: H.History<History.LocationState>
}