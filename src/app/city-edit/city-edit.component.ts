import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CityService} from "../services/city.service";

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  errorMessage: any;

  constructor(public route: ActivatedRoute,
              private cityService: CityService) {
  }

  city: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'] ? params['id'] : null;
      this.cityService.findById(id).subscribe(res => {
        this.city = res.body;
      }, error => {
        if (error.status == 403) {
          this.errorMessage = "User Not allowed";
        }
      })
    });
  }

}
