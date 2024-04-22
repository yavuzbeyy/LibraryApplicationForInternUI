export class BookModel {
    title: string = '';
    publicationYear: number = 0;
    numberOfPages: number = 0;
    isAvailable: boolean = true;
    authorId: number = 0;
    categoryId: number = 0;
    authorName: string = ''; // Kullanıcı tarafından seçilen yazarın adı
    categoryName: string = ''; // Kullanıcı tarafından seçilen kategorinin adı
  }