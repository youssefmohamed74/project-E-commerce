export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    let pageNumber = this.searchQuery.page * 1 || 1;
    if (this.searchQuery.page < 1) pageNumber = 1;
    const limit = 2;
    let skip = (parseInt(pageNumber) - 1) * limit;
    this.pageNumber = pageNumber;
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  filter() {
    let FilterObj = structuredClone(this.searchQuery);
    FilterObj = JSON.stringify(FilterObj);
    FilterObj = FilterObj.replace(/(gt|gte|lte|lt)/g, (value) => {
      return "$" + value;
    });
    FilterObj = FilterObj.parse(FilterObj);
    let exCloudedFields = ["page", "sort", "search", "fields"];
    exCloudedFields.forEach((val) => {
      delete FilterObj[val];
    });
    this.mongooseQuery.find(FilterObj);
    return this;
  }
  sort() {
    if (this.searchQuery.sort) {
      let sortedBy = this.searchQuery.sort.split(",").join("");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }
  fields() {
    if (this.searchQuery.fields) {
      let SelectedFields = this.searchQuery.fields.split(",").join("");
      this.mongooseQuery.select(SelectedFields);
    }
    return this;
  }
  search() {
    if (this.searchQuery.search) {
      this.mongooseQuery.find({
        $or: [
          { Title: { $regex: this.searchQuery.search, $options: "i" } },
          { Description: { $regex: this.searchQuery.search, $options: "i" } },
        ],
      });
    }
    return this;
  }
}
