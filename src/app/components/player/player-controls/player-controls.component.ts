import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { Player } from '../../../models/player.model';
import { Track } from '../../../models/track.model';
import { TracksState } from '../../../reducers/tracks.reducer';
import { PlayerActions } from '../../../actions/player.actions';
import { PlayerState } from '../../../reducers/player.reducer';
import { AppStore } from '../../../models/appstore.model';

@Component({
  selector: 'player-controls',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent implements OnDestroy {
  player$: Observable<Player>;
  tracks$: Observable<Track[]>;
  isPlaying: boolean;
  currentTrackId: number;
  repeatTrack: boolean;
  shuffleTracks: boolean;
  showVisualization: boolean;
  playerSubscription: Subscription;
  tracksList: Track[];


  constructor (private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.player$ = this.store$.select(s => s.player);
    this.playerSubscription = this.player$.subscribe((item) => {
      this.isPlaying = item.isPlaying;
      this.currentTrackId = item.currentTrack.id;
      this.repeatTrack = item.repeatTrack;
      this.shuffleTracks = item.shuffleTracks;
      this.showVisualization = item.showVisualization;
    });
    this.tracks$ = this.store$.select(s => s.tracks);
    this.tracksSubscription = this.tracks$.subscribe(tracksList => this.tracksList = tracksList);
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
    this.tracksSubscription.unsubscribe();
  }

  getCurrentTrackIndex(): number {
    return this.tracksList.reduce((acc, cur, index) => {
      if (acc !== null) {
        return acc;
      } else if (cur.id === this.currentTrackId) {
        return index;
      } else {
        return null;
      }
    }, null);
  }

  toggleRepeat() {
    this.store$.dispatch(this.playerActions.toggleRepeat());
  }

  toggleShuffle() {
    this.store$.dispatch(this.playerActions.toggleShuffle());
  }

  toggleVisualization() {
    this.store$.dispatch(this.playerActions.toggleShowVisualization());
  }

  togglePlayPause() {
    this.store$.dispatch(this.playerActions.togglePlayPause());
  }

  jumpToPrevious() {
    // Find the index of the current track
    let currentTrackIndex: number = this.getCurrentTrackIndex();

    if (this.shuffleTracks) {
      // generate a random index number between 0 and the length of the playlist
      let max = this.tracksList.length;
      let randomIdx = Math.floor(Math.random() * max);
      this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[randomIdx]));
    } else {
      // Check to make sure that we are not at the end of list
      if (currentTrackIndex !== 0) {
        this.store$.dispatch(this.playerActions.jumpToPrevious(this.tracksList[currentTrackIndex - 1]));
      } else {
        // Stop playing because you've reach the beginning of your playlist and there is nowhere to go.
        this.store$.dispatch(this.playerActions.jumpToPrevious(this.tracksList[this.tracksList.length - 1]));
      }
    }
  }

  jumpToNext() {
    // Find the index of the current track
    let currentTrackIndex: number = this.getCurrentTrackIndex();

    if (this.shuffleTracks) {
      // generate a random index number between 0 and the length of the playlist
      let max = this.tracksList.length;
      let randomIdx = Math.floor(Math.random() * max);
      this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[randomIdx]));
    } else {
      if (currentTrackIndex < this.tracksList.length - 1) {
        this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[currentTrackIndex + 1]));
      } else {
        this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[0]));
      }
    }
  }
}
