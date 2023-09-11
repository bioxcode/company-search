export type CompanyDetails = {
  company_status: string,
  address_snippet: string,
  date_of_creation: string,
  matches: {
    title: number[]
  },
  description: string,
  links: {
    self: string,
  },
  company_number: string,
  title: string,
  company_type: string,
  address: {
    premises: string,
    postal_code: string,
    country: string,
    locality: string,
    address_line_1: string,
  },
  kind: string,
  description_identifier: string[],
}

export type Officer = {
  name: string,
  officer_role: string,
}

export type SearchResponse = {
  page_number: number,
  kind: string,
  total_results: number,
  items: CompanyDetails[],
}

export type OfficersResponse = {
  items: Officer[],
}
