import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Announcement } from './announcement.model';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class DataService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    updateMessages(updated) {
        // const seed = [
        //   {
        //       message: 'Tutoring @ aurora public library 9am -3pm',
        //       startDate: new Date(),
        //       endDate: new Date()
        //   },
        //   {
        //     message: 'coffee taste test',
        //     startDate: new Date(),
        //     endDate: new Date()
        //   }
        // ];
        console.log(updated);
        const token = this.authService.getToken();
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.put<AnnouncementResponse>('https://ekberg-home-solutions.firebaseio.com/announcements.json',
            updated, {
                headers: headers,
                params: new HttpParams().set('auth', token)
            }
        );
    }

    getMessages() {
        return this.http.get<AnnouncementResponse>('https://ekberg-home-solutions.firebaseio.com/announcements.json', {
            observe: 'body',
            responseType: 'json'
        });
    }
}

interface AnnouncementResponse {
    announcements: Announcement[];
}
