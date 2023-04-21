import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { AllItemsResponse } from '../responses/all-items-response';
import { ItemResponse } from '../responses/item-response';
import { ItemAddRequestDTO } from '../responses/item-add-request-dto';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  AddItemForm!: FormGroup;
  AllItemsResponse: AllItemsResponse[] = [];
  ItemToEdit!: ItemResponse | null;
 
  constructor(
    private fb: FormBuilder,
    public modalService: NgbModal,
    private itemService: ItemService
  ) { 
    this.getAllItems();
  }

  ngOnInit(): void {

    /// 

    this.getAllItems();
    this.formCreation();

    ////
    
  }

  getAllItems() { this.itemService.getAllItems().subscribe(data => { this.AllItemsResponse = data; }); }

  formCreation() {
    this.AddItemForm = this.fb.group({
      name: this.fb.control(null),
      price: this.fb.control(null),
      picture: this.fb.control(null),
      sizes: this.fb.array([])
    });
  }

  private addSizes() {
    return this.fb.group({
      name: this.fb.control(null),
      price: this.fb.control(null)
    });
  }

  openAddModal(content: any) {
    this.ItemToEdit = null;
    this.AddItemForm.reset(this.formCreation());
    this.sizesGetter.push(this.addSizes());
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  addNewRow() { this.sizesGetter.push(this.addSizes()); }

  deleteRow(index: number) { this.sizesGetter.removeAt(index); }

  saveItem(itemAddRequest: ItemAddRequestDTO) {
    if (this.ItemToEdit){
      console.log(itemAddRequest);
      
      this.itemService.updateItem(itemAddRequest, this.ItemToEdit.id).subscribe({
        next: data => {
          this.modalService.dismissAll();
          this.getAllItems();

        },
        error: err => { }
      });
    }
    else
    {
      this.itemService.addNewItem(itemAddRequest).subscribe({
        next: data => {
          this.modalService.dismissAll();
          this.getAllItems();

        },
        error: err => { }
      });
    }
  }

  imgFunction(imgFile: any) {
    console.log("Changed !");
    
    const fileReader = new FileReader();

    if (imgFile.target.files) {
      const [picFile] = imgFile.target.files;
      fileReader.readAsDataURL(picFile);
      fileReader.onload = () => {
        this.AddItemForm.patchValue({ picture: fileReader.result })
      }
    }
  }

  get sizesGetter() { return this.AddItemForm.get('sizes') as FormArray }

  openEditModal(modal: any, itemId: number) {
    this.AddItemForm.reset(this.formCreation());
    
    this.itemService.getItemById(itemId).subscribe({
      next: data => {
        this.ItemToEdit = data;
        this.AddItemForm.patchValue(data);

        data.sizes.forEach(size => {
          this.sizesGetter.push(this.fb.group({
            name: size.name,
            price: size.price
          }));
        });

      },
      complete: () => {
        this.modalService.open(modal, { size: 'lg', centered: true });
      }
    });

  }

  deleteItem(itemId: number) {
    this.itemService.deleteItem(itemId).subscribe({
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.getAllItems();        
      }
    });
  }

}
