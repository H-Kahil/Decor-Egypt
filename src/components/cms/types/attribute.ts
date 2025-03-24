export interface AttributeValue {
  id: string;
  value: string;
}

export interface Attribute {
  id: string;
  name: string;
  description?: string;
  values: AttributeValue[];
  familyId?: string;
  familyName?: string;
  brandId?: string;
  brandName?: string;
  categoryId?: string;
  categoryName?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  productLineId?: string;
  productLineName?: string;
  status: string;
}
