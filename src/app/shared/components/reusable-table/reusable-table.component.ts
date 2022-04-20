import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { mainAnimations } from '../../animations/main-animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reusable-table',
  animations: [mainAnimations],
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;
  @Input() withFolder: boolean = false;
  @Input() showStatData: boolean = true;

  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
  @Input() selectedColumnsMobile: string[] = [];
  @Input() tableNumber: number = 0;
  @Input() multipleSelect: boolean = false;
  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSelectedRowDialog: EventEmitter<any> = new EventEmitter<any>();
  
  @Output() viewDetails: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Input() maxRows: number = 5;

  // for filtering
  public searchBy: string = '';
  public dataSource = new MatTableDataSource<any>(this.listDataSource);
  public selectedRows: any[] = [];

  // pagination option 
  public page: number = 1;
  public pageNumbers: number = 1;
  public paginate: number[] = [];
  public dbClickActive: boolean = false;
  // column and table controls
  public tableController: any = [
    /*{
      name:'Import',
      class: 'import',
      icon: '/assets/images/icons/import.png',
      action_event: (action_event) => action_event
    },*/

    {
      name:'Delete',
      class: 'delete',
      icon: '/assets/images/icons/delete.png',
      action_event: (action_event) => action_event
    },
  /*
      {
        name:'Export',
        class: 'export',
        icon: '/assets/images/icons/export.png',
        action_event: (action_event) => action_event
      },*/
  ];
  
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    //this.listDataSource = [];
    //this.filterByStatus(); // filter client list by status
    this.dataSource.data = [...this.listDataSource].slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...this.listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  repaginate(list: any[]): void{
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
  }

  
  /*
    Adjust max number of items shown for client list
      @params
        - limit: number (max number of items per page)
  */
  adjustNumberOfItems(limit: number = 10): void {
    const listDataSource = [...this.listDataSource];

    this.dataSource.data = listDataSource.slice(0, limit);
    this.maxRows = limit;
    this.repaginate(listDataSource);
  }

  /*
    Navigate to n page
      @params
        - page: page number to navigate
  */
  changePage(page: number): void {
    if(page < 1){
      this.page = 1;
      return;
    }

    if(page > this.paginate.length){
      this.page = this.paginate.length;
      return;
    }

    const temp = page * this.maxRows;
    const listDataSource = [...this.listDataSource];

    this.dataSource.data = listDataSource.slice(temp - this.maxRows, temp);
    this.page = page;
    //window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }

  pageRange(page, pageCount) {
    let start = page - 2,
        end = page + 2;

    if (end > pageCount) {
        start -= (end - pageCount);
        end = pageCount;
    }
    if (start <= 0) {
        end += ((start - 1) * (-1));
        start = 1;
    }

    end = end > pageCount ? pageCount : end;

    return {
        start: start - 1,
        end: end
    };
  }


  /*
    Client list table filter
  */
  searchDataSource(): void {
    const listDataSource = [...this.listDataSource]
    .filter(el => {
      let source = this.searchSource(el);
      /* Remove hidden columns from search */
      for(let item in source){
        let index = this.selectedColumns.indexOf(item) 

        if(index === -1)
          delete source[item];
      }
      
      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.dataSource.data = listDataSource.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);;
    this.page = 1;

  }

  /* 
    Select row from list 
    @params 
      - row : Client List row
  */
  selectRows(row: any){
    let index = this.selectedRows.findIndex(el => el.id === row.id);

    if(index > -1)
        this.selectedRows.splice(index, 1);
    else {
      if(this.multipleSelect)
        this.selectedRows = [...this.selectedRows, row];     
      
      else 
        this.selectedRows = [row];
    }

    // update selected rows from parent
    this.updateSelectedRows.emit({
      tableNumber: this.tableNumber,
      selectedRows: this.selectedRows
    }); 
  }


  /*
    Open dialog component 
      @params 
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string, data: any): void {

    if(action_type === 'edit') {
      this.updateSelectedRowDialog.emit({
        action: action_type,
        data: data
      });
    }
      
    else if(action_type === 'delete'){
      this.deleteSelectedRow.emit({
        action: action_type,
        data: data
      });
    }
      
  }

  /* View Detail Dialog
  */
  viewDetailDialog(row): void{
    console.log(row)
    this.viewDetails.emit({
      title: this.componentTitle,  
      data: row
    });
  }

}
