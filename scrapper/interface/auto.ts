export interface overviewValidator {
  name? : string,
  price? : string,
  image? :string,
  Our_Rating? : string,
  Fuel_type_propulsion ? : string,
  Engine_displacement ? : string,
  Body_style ? : string,
  Doors ? : string,
  Seats ? : string,
  Crash_Test_Rating ? : string,
  Airbags ? : string,
  Max_Power ? : string,
  Max_Torque ? : string,
  Gearbox_Type ? : string,
  Claimed_Electric_Motor_Range ? : string,
  Warranty_Distance ? : string,
  Warranty_Duration ? : string,
}

export interface dimensionsValidator {
  Length?: string,
  Width?: string,
  Height?: string,
  Wheelbase?: string,
  Ground_Clearance?: string,
  Kerb_Weight?: string,
  Boot_Capacity?: string,
}
