import {Component, OnInit} from '@angular/core';
import {Player} from "../../models/Player";
import {PlayerService} from "../../service/player.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})

export class SearchPlayerComponent implements OnInit {

  players$!: Observable<Player[]>;
  searchForm!: FormGroup;
  inputName$!: Observable<string>;

  constructor(private playerService: PlayerService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.players$ = this.playerService.getAllPLayers();

    this.searchForm = this.formBuilder.group({
      input: [null]
    })
    this.inputName$ = this.searchForm.valueChanges;

    this.searchForm.valueChanges.subscribe((value) => {
        this.onInputValueChange(value);
      }
    );
  }

  private onInputValueChange(value: any) {
    const split: string [] = value.input.split(' ');
    const firstname = split[0]
    const lastname: string = split[1];
    this.players$.subscribe(
      (players) => {
        const player = players.filter(player => player.lastname === lastname && player.firstname == firstname)[0];
        const id = player.id;
        this.router.navigateByUrl(`playerdetails/${id}`).then();
      }
    );
  }
}
