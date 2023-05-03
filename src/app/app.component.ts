import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';
import { ApiService } from './services/api.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task1';

  displayedColumns: string[] = [
    'userId',
    'category',
    'app',
    'userName',
    'password',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllPassword();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == 'Saved') {
        this.getAllPassword();
      }
    });
  }

  getAllPassword() {
    this.api.getPassword().subscribe({
      next: (res) => {
        console.log('All Password', res);

        var result = res.map(function (x: { password: string }) {
          x.password = atob(x.password);
        });

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error while fetching password');
      },
    });
  }

  deletePassword(id: number) {
    this.api.deletePassword(id).subscribe({
      next: (res) => {
        alert('Password Deleted');
        this.getAllPassword();
      },
      error: () => {
        alert('Error while deleting');
      },
    });
  }

  editPassword(row: any) {
    this.dialog
      .open(DailogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'Updated') {
          this.getAllPassword();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
