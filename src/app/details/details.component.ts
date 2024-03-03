import { Component , OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  private file!: File;
  private periodicity!: string;
  private periods!: number;
  responseData: any;
  

constructor(private auth:AuthService,private http: HttpClient){

}

  ngOnInit(): void{
this.auth.canAccess();
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('csvFile', this.file);
    formData.append('periodicity', this.periodicity);
    formData.append('periods', this.periods.toString());

    this.http.post('http://127.0.0.1:5000/', formData, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('File uploaded successfully');
        this.responseData = response;
      },
      (error) => {
        console.error('File upload failed',error.message);
      }
    );
  }
  onPeriodicityChange(event: any): void {
    this.periodicity = event.target.value;
  }

  onPeriodsChange(event: any): void {
    this.periods = event.target.value;
  }
}