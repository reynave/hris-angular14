import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { environment } from 'src/environments/environment';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-salery-upload',
  templateUrl: './salery-upload.component.html',
  styleUrls: ['./salery-upload.component.css']
})
export class SaleryUploadComponent implements OnInit {

  file: File | null = null;
  sheetNames: string[] = [];
  selectedSheetName: string | null = null;
  sheetData: any[] = [];
  sheetHeader: any = [];
  switch_expression: string = "";
  selectAccount: any = [];
  onSubmitDisable: boolean = true;
  uploadId: string = '';
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }
  //sudo mv -f print_profit_sharing_hris.php /var/www/html/RestServiceSKidz

  ngOnInit(): void {
  }
  onFileChange(event: any): void {
    this.file = event.target.files[0];
    this.readExcelFile();
  }

  readExcelFile(index: number = 0): void {
    if (!this.file) {
      return;
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

      // Ambil nama-nama sheet
      this.sheetNames = workbook.SheetNames;

      // Default pilih sheet pertama
      this.selectedSheetName = this.selectedSheetName == null ? this.sheetNames[0] : this.selectedSheetName;

      // Ambil data dari sheet yang dipilih
      const worksheet: XLSX.WorkSheet = workbook.Sheets[this.selectedSheetName];
      this.sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      let i = 0;


      this.sheetData[0].forEach((el: any) => {
        const temp = {
          index: i,
          name: el,
          field: "",
        }
        i++;
        this.sheetHeader.push(temp);
      });
      console.log(this.sheetHeader, this.sheetData);
    };

    reader.readAsArrayBuffer(this.file);
    this.switch_expression = "step1";
  }
  uploadItem: any = [];
  findUploadId() {
    const body = {
      uploadId: this.uploadId
    }

    this.http.get<any>(environment.api + "SalaryFix/findUploadId", {
      headers: this.configService.headers(),
      params: body,
    }).subscribe(
      data => {
        console.log(data);
        this.uploadItem = data['data'];
      },
      error => {
        console.error(error);
      }
    )
  }

  onDelete(uploadId: string) {
    if (confirm("Delete this " + uploadId + "? ")) {

      const body = {
        uploadId: uploadId
      }

      this.http.post<any>(environment.api + "SalaryFix/onDelete", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.findUploadId();
        },
        error => {
          console.error(error);
          alert("onDelete error");
        }
      )
    }
  }


  onSubmit() {
    const body = {
      items: this.sheetData
    }

    this.http.post<any>(environment.api + "SalaryFix/onSubmit", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        alert("Upload success");
        history.back();
      },
      error => {
        console.error(error);
        alert("Upload error");
      }
    )
  }
  back() {
    history.back();
  }
}
