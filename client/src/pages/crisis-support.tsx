import { useState } from "react";
import { Phone, Globe, AlertTriangle, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface EmergencyNumber {
  service: string;
  number: string;
  description: string;
}

interface CountryData {
  name: string;
  code: string;
  emergency: EmergencyNumber[];
  mentalHealth: EmergencyNumber[];
  suicide: EmergencyNumber[];
}

const emergencyData: Record<string, CountryData> = {
  // North America
  US: {
    name: "United States",
    code: "US",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" },
      { service: "Crisis Text Line", number: "Text HOME to 741741", description: "24/7 crisis support via text" }
    ],
    mentalHealth: [
      { service: "National Suicide Prevention Lifeline", number: "988", description: "24/7 suicide prevention and crisis support" },
      { service: "NAMI Helpline", number: "1-800-950-6264", description: "National Alliance on Mental Illness support" },
      { service: "SAMHSA Helpline", number: "1-800-662-4357", description: "Substance abuse and mental health services" }
    ],
    suicide: [
      { service: "988 Suicide & Crisis Lifeline", number: "988", description: "24/7 free and confidential support" },
      { service: "Crisis Text Line", number: "Text HELLO to 741741", description: "Free 24/7 support via text message" }
    ]
  },
  CA: {
    name: "Canada",
    code: "CA",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Canada Suicide Prevention Service", number: "1-833-456-4566", description: "24/7 bilingual crisis support" },
      { service: "Kids Help Phone", number: "1-800-668-6868", description: "24/7 support for youth" },
      { service: "Crisis Text Line Canada", number: "Text CONNECT to 686868", description: "24/7 crisis support via text" }
    ],
    suicide: [
      { service: "Talk Suicide Canada", number: "1-833-456-4566", description: "24/7 suicide prevention support" },
      { service: "First Nations & Inuit Hope for Wellness", number: "1-855-242-3310", description: "24/7 culturally sensitive support" }
    ]
  },
  MX: {
    name: "Mexico",
    code: "MX",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "SAPTEL", number: "55 5259-8121", description: "Psychological crisis telephone system" },
      { service: "Línea de la Vida", number: "800 911 2000", description: "24/7 suicide prevention hotline" }
    ],
    suicide: [
      { service: "Línea de la Vida", number: "800 911 2000", description: "24/7 suicide prevention support" }
    ]
  },

  // Europe
  GB: {
    name: "United Kingdom",
    code: "GB",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Ambulance" },
      { service: "Non-Emergency Police", number: "101", description: "Non-urgent police matters" },
      { service: "NHS Non-Emergency", number: "111", description: "Non-emergency medical advice" }
    ],
    mentalHealth: [
      { service: "Samaritans", number: "116 123", description: "24/7 emotional support" },
      { service: "Mind Infoline", number: "0300 123 3393", description: "Mental health information and support" },
      { service: "CALM (Campaign Against Living Miserably)", number: "0800 58 58 58", description: "Support for men in crisis" }
    ],
    suicide: [
      { service: "Samaritans", number: "116 123", description: "Free 24/7 suicide prevention support" },
      { service: "Crisis Text Line UK", number: "Text SHOUT to 85258", description: "24/7 text crisis support" }
    ]
  },
  DE: {
    name: "Germany",
    code: "DE",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Fire and Medical Emergency" },
      { service: "Police", number: "110", description: "Police Emergency" }
    ],
    mentalHealth: [
      { service: "Telefonseelsorge", number: "0800 111 0 111", description: "24/7 spiritual and psychological support" },
      { service: "Telefonseelsorge Alternative", number: "0800 111 0 222", description: "24/7 crisis counseling" }
    ],
    suicide: [
      { service: "Nummer gegen Kummer", number: "116 111", description: "Youth suicide prevention hotline" },
      { service: "Telefonseelsorge", number: "0800 111 0 111", description: "24/7 suicide prevention support" }
    ]
  },
  FR: {
    name: "France",
    code: "FR",
    emergency: [
      { service: "Emergency Services", number: "112", description: "European emergency number" },
      { service: "SAMU (Medical)", number: "15", description: "Medical emergency services" },
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire Brigade", number: "18", description: "Fire emergency services" }
    ],
    mentalHealth: [
      { service: "SOS Amitié", number: "09 72 39 40 50", description: "24/7 emotional support and listening" },
      { service: "Suicide Écoute", number: "01 45 39 40 00", description: "24/7 suicide prevention hotline" }
    ],
    suicide: [
      { service: "Suicide Écoute", number: "01 45 39 40 00", description: "24/7 suicide prevention support" },
      { service: "SOS Amitié", number: "09 72 39 40 50", description: "Crisis support and listening" }
    ]
  },
  IT: {
    name: "Italy",
    code: "IT",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Carabinieri and general emergencies" },
      { service: "Medical Emergency", number: "118", description: "Medical emergency services" },
      { service: "Fire Brigade", number: "115", description: "Fire emergency services" }
    ],
    mentalHealth: [
      { service: "Telefono Amico", number: "02 2327 2327", description: "Emotional support and crisis counseling" },
      { service: "Samaritans Onlus", number: "800 86 00 22", description: "Suicide prevention and crisis support" }
    ],
    suicide: [
      { service: "Samaritans Onlus", number: "800 86 00 22", description: "24/7 suicide prevention support" }
    ]
  },
  ES: {
    name: "Spain",
    code: "ES",
    emergency: [
      { service: "Emergency Services", number: "112", description: "All emergency services" },
      { service: "Police", number: "091", description: "National Police" },
      { service: "Medical Emergency", number: "061", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Teléfono de la Esperanza", number: "717 003 717", description: "Crisis intervention and suicide prevention" },
      { service: "SAPTEL", number: "91 459 00 50", description: "Psychological support telephone" }
    ],
    suicide: [
      { service: "Teléfono de la Esperanza", number: "717 003 717", description: "24/7 suicide prevention support" }
    ]
  },
  NL: {
    name: "Netherlands",
    code: "NL",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "113 Zelfmoordpreventie", number: "113", description: "24/7 suicide prevention hotline" },
      { service: "Korrelatie", number: "0900 1450", description: "Crisis support and counseling" }
    ],
    suicide: [
      { service: "113 Zelfmoordpreventie", number: "113", description: "National suicide prevention hotline" }
    ]
  },
  SE: {
    name: "Sweden",
    code: "SE",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "BRIS", number: "116 111", description: "Support for children and youth" },
      { service: "Jourhavande medmänniska", number: "08-702 16 80", description: "Crisis support and counseling" }
    ],
    suicide: [
      { service: "Självmordslinjen", number: "90101", description: "Suicide prevention hotline" }
    ]
  },
  NO: {
    name: "Norway",
    code: "NO",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Mental Helse", number: "116 123", description: "24/7 mental health support" },
      { service: "Kirkens SOS", number: "22 40 00 40", description: "Crisis counseling and support" }
    ],
    suicide: [
      { service: "Mental Helse", number: "116 123", description: "Suicide prevention and crisis support" }
    ]
  },

  // Asia
  IN: {
    name: "India",
    code: "IN",
    emergency: [
      { service: "Emergency Services", number: "112", description: "All emergency services (Police, Fire, Medical)" },
      { service: "Police", number: "100", description: "Police emergency" },
      { service: "Fire", number: "101", description: "Fire emergency" },
      { service: "Medical Emergency", number: "108", description: "Ambulance and medical emergency" }
    ],
    mentalHealth: [
      { service: "KIRAN Mental Health Helpline", number: "1800-599-0019", description: "24/7 mental health support" },
      { service: "Vandrevala Foundation", number: "9999 666 555", description: "24/7 crisis helpline and outreach" },
      { service: "COOJ Mental Health Foundation", number: "+91 83 76 04 02 02", description: "Mental health support and counseling" }
    ],
    suicide: [
      { service: "AASRA", number: "91-9820466726", description: "24/7 suicide prevention helpline" },
      { service: "Sneha Foundation", number: "044-24640050", description: "Suicide prevention center" },
      { service: "Roshni Helpline", number: "040-66202000", description: "24/7 emotional support" }
    ]
  },
  CN: {
    name: "China",
    code: "CN",
    emergency: [
      { service: "Police", number: "110", description: "Police emergency" },
      { service: "Fire", number: "119", description: "Fire emergency" },
      { service: "Medical Emergency", number: "120", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Beijing Crisis Intervention", number: "400-161-9995", description: "Crisis intervention hotline" },
      { service: "Shanghai Mental Health Center", number: "021-64387250", description: "Mental health support" }
    ],
    suicide: [
      { service: "Beijing Crisis Intervention", number: "400-161-9995", description: "Suicide prevention support" }
    ]
  },
  JP: {
    name: "Japan",
    code: "JP",
    emergency: [
      { service: "Police", number: "110", description: "Police emergency" },
      { service: "Fire/Medical", number: "119", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "TELL Lifeline", number: "03-5774-0992", description: "English-language crisis hotline" },
      { service: "Inochi no Denwa", number: "0570-783-556", description: "24/7 suicide prevention hotline" }
    ],
    suicide: [
      { service: "Inochi no Denwa", number: "0570-783-556", description: "Suicide prevention counseling" }
    ]
  },
  KR: {
    name: "South Korea",
    code: "KR",
    emergency: [
      { service: "Police", number: "112", description: "Police emergency" },
      { service: "Fire/Medical", number: "119", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "Suicide Prevention Center", number: "1393", description: "24/7 suicide prevention hotline" },
      { service: "Mental Health Center", number: "1577-0199", description: "Mental health counseling" }
    ],
    suicide: [
      { service: "Suicide Prevention Center", number: "1393", description: "Suicide prevention and crisis support" }
    ]
  },
  TH: {
    name: "Thailand",
    code: "TH",
    emergency: [
      { service: "Emergency Services", number: "191", description: "Police emergency" },
      { service: "Medical Emergency", number: "1669", description: "Medical emergency services" },
      { service: "Fire", number: "199", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Department of Mental Health Hotline", number: "1323", description: "24/7 mental health support" },
      { service: "Samaritans of Thailand", number: "02-713-6791", description: "Crisis counseling in English" }
    ],
    suicide: [
      { service: "Department of Mental Health", number: "1323", description: "Suicide prevention hotline" }
    ]
  },
  MY: {
    name: "Malaysia",
    code: "MY",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Befrienders KL", number: "03-7627-2929", description: "24/7 emotional support" },
      { service: "Talian Kasih", number: "15999", description: "24/7 psychosocial support" }
    ],
    suicide: [
      { service: "Befrienders KL", number: "03-7627-2929", description: "Suicide prevention and crisis support" }
    ]
  },
  SG: {
    name: "Singapore",
    code: "SG",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police emergency" },
      { service: "Fire/Medical", number: "995", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "Samaritans of Singapore", number: "1800-221-4444", description: "24/7 emotional support" },
      { service: "Institute of Mental Health", number: "6389-2222", description: "Mental health emergency" }
    ],
    suicide: [
      { service: "Samaritans of Singapore", number: "1800-221-4444", description: "24/7 suicide prevention support" }
    ]
  },
  ID: {
    name: "Indonesia",
    code: "ID",
    emergency: [
      { service: "Police", number: "110", description: "Police emergency" },
      { service: "Fire", number: "113", description: "Fire emergency" },
      { service: "Medical Emergency", number: "118", description: "Medical emergency services" },
      { service: "Search and Rescue", number: "115", description: "Search and rescue operations" }
    ],
    mentalHealth: [
      { service: "Sejiwa", number: "119", description: "Mental health crisis hotline" },
      { service: "LSM Jangan Bunuh Diri", number: "021-9696-9293", description: "Suicide prevention hotline" }
    ],
    suicide: [
      { service: "LSM Jangan Bunuh Diri", number: "021-9696-9293", description: "Suicide prevention support" }
    ]
  },
  PH: {
    name: "Philippines",
    code: "PH",
    emergency: [
      { service: "Emergency Services", number: "911", description: "All emergency services" }
    ],
    mentalHealth: [
      { service: "DOH-NCMH Crisis Hotline", number: "1553", description: "24/7 mental health crisis hotline" },
      { service: "In Touch Crisis Line", number: "8893-7603", description: "Crisis counseling and support" }
    ],
    suicide: [
      { service: "DOH-NCMH Crisis Hotline", number: "1553", description: "Suicide prevention and crisis support" }
    ]
  },

  // Oceania
  AU: {
    name: "Australia",
    code: "AU",
    emergency: [
      { service: "Emergency Services", number: "000", description: "Police, Fire, Ambulance" },
      { service: "Police Assistance Line", number: "131 444", description: "Non-urgent police assistance" }
    ],
    mentalHealth: [
      { service: "Lifeline", number: "13 11 14", description: "24/7 crisis support and suicide prevention" },
      { service: "Beyond Blue", number: "1300 22 46 36", description: "24/7 mental health support" },
      { service: "Kids Helpline", number: "1800 55 1800", description: "24/7 support for young people" }
    ],
    suicide: [
      { service: "Lifeline Australia", number: "13 11 14", description: "24/7 suicide prevention crisis support" },
      { service: "Suicide Call Back Service", number: "1300 659 467", description: "24/7 telephone and online counseling" }
    ]
  },
  NZ: {
    name: "New Zealand",
    code: "NZ",
    emergency: [
      { service: "Emergency Services", number: "111", description: "Police, Fire, Ambulance" }
    ],
    mentalHealth: [
      { service: "1737", number: "1737", description: "24/7 mental health and wellbeing support" },
      { service: "Lifeline Aotearoa", number: "0800 543 354", description: "24/7 crisis support" },
      { service: "Youthline", number: "0800 376 633", description: "24/7 support for young people" }
    ],
    suicide: [
      { service: "1737", number: "1737", description: "24/7 suicide prevention support" },
      { service: "Lifeline Aotearoa", number: "0800 543 354", description: "Suicide prevention and crisis counseling" }
    ]
  },

  // Africa
  ZA: {
    name: "South Africa",
    code: "ZA",
    emergency: [
      { service: "Emergency Services", number: "112", description: "All emergency services" },
      { service: "Police", number: "10111", description: "Police emergency" },
      { service: "Medical Emergency", number: "10177", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "SADAG", number: "0800 567 567", description: "South African Depression and Anxiety Group" },
      { service: "Lifeline", number: "0861 322 322", description: "24/7 crisis counseling" }
    ],
    suicide: [
      { service: "SADAG", number: "0800 567 567", description: "Suicide crisis helpline" },
      { service: "Lifeline", number: "0861 322 322", description: "Suicide prevention support" }
    ]
  },
  NG: {
    name: "Nigeria",
    code: "NG",
    emergency: [
      { service: "Emergency Services", number: "199", description: "General emergency services" },
      { service: "Police", number: "199", description: "Police emergency" }
    ],
    mentalHealth: [
      { service: "Mentally Aware Nigeria Initiative", number: "0700 626 4264", description: "Mental health support hotline" }
    ],
    suicide: [
      { service: "Mentally Aware Nigeria", number: "0700 626 4264", description: "Suicide prevention support" }
    ]
  },
  EG: {
    name: "Egypt",
    code: "EG",
    emergency: [
      { service: "Police", number: "122", description: "Police emergency" },
      { service: "Fire", number: "180", description: "Fire emergency" },
      { service: "Medical Emergency", number: "123", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Egyptian Mental Health Association", number: "02-2735-9602", description: "Mental health support" }
    ],
    suicide: [
      { service: "Egyptian Mental Health Association", number: "02-2735-9602", description: "Crisis counseling" }
    ]
  },

  // South America
  BR: {
    name: "Brazil",
    code: "BR",
    emergency: [
      { service: "Police", number: "190", description: "Military Police" },
      { service: "Fire/Medical", number: "193", description: "Fire Brigade and Medical Emergency" },
      { service: "Civil Police", number: "197", description: "Civil Police" }
    ],
    mentalHealth: [
      { service: "CVV - Centro de Valorização da Vida", number: "188", description: "24/7 emotional support and suicide prevention" },
      { service: "SUS Mental Health", number: "136", description: "Public health mental health services" }
    ],
    suicide: [
      { service: "CVV", number: "188", description: "24/7 suicide prevention hotline" }
    ]
  },
  AR: {
    name: "Argentina",
    code: "AR",
    emergency: [
      { service: "Emergency Services", number: "911", description: "All emergency services" },
      { service: "Police", number: "101", description: "Police emergency" },
      { service: "Fire", number: "100", description: "Fire emergency" },
      { service: "Medical Emergency", number: "107", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Centro de Asistencia al Suicida", number: "135", description: "Suicide assistance center" }
    ],
    suicide: [
      { service: "Centro de Asistencia al Suicida", number: "135", description: "24/7 suicide prevention support" }
    ]
  },
  CL: {
    name: "Chile",
    code: "CL",
    emergency: [
      { service: "Emergency Services", number: "133", description: "All emergency services" },
      { service: "Police", number: "133", description: "Police emergency" },
      { service: "Fire", number: "132", description: "Fire emergency" },
      { service: "Medical Emergency", number: "131", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Salud Responde", number: "600 360 7777", description: "24/7 health information and mental health support" }
    ],
    suicide: [
      { service: "Salud Responde", number: "600 360 7777", description: "Mental health crisis support" }
    ]
  },

  // Middle East
  IL: {
    name: "Israel",
    code: "IL",
    emergency: [
      { service: "Police", number: "100", description: "Police emergency" },
      { service: "Fire/Medical", number: "102", description: "Fire and medical emergency" },
      { service: "Magen David Adom", number: "101", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "ERAN Helpline", number: "1201", description: "24/7 emotional support hotline" },
      { service: "Samaritans Israel", number: "09-8891333", description: "Crisis support and suicide prevention" }
    ],
    suicide: [
      { service: "ERAN", number: "1201", description: "Suicide prevention and emotional support" }
    ]
  },
  AE: {
    name: "United Arab Emirates",
    code: "AE",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police emergency" },
      { service: "Fire/Medical", number: "997", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "Dubai Foundation for Women and Children", number: "800-988", description: "Crisis support and counseling" }
    ],
    suicide: [
      { service: "Dubai Foundation", number: "800-988", description: "Crisis intervention and support" }
    ]
  },
  SA: {
    name: "Saudi Arabia",
    code: "SA",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire/Medical", number: "997", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "Ministry of Health Mental Health", number: "920-033-707", description: "Mental health support services" }
    ],
    suicide: [
      { service: "Ministry of Health", number: "920-033-707", description: "Mental health crisis support" }
    ]
  },

  // Additional Countries (Comprehensive Global Coverage)
  
  // Africa (Additional)
  DZ: {
    name: "Algeria",
    code: "DZ",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "14", description: "Fire emergency" },
      { service: "Medical Emergency", number: "14", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Algerian Mental Health Services", number: "021-23-45-67", description: "Mental health support" }
    ],
    suicide: [
      { service: "Crisis Support Algeria", number: "021-23-45-67", description: "Crisis counseling" }
    ]
  },
  AO: {
    name: "Angola",
    code: "AO",
    emergency: [
      { service: "Police", number: "111", description: "Police emergency" },
      { service: "Fire/Medical", number: "112", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "Ministry of Health Angola", number: "244-222-330-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Angola Crisis Support", number: "244-222-330-000", description: "Crisis intervention" }
    ]
  },
  BJ: {
    name: "Benin",
    code: "BJ",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Benin Mental Health", number: "229-21-30-00-00", description: "Mental health support" }
    ],
    suicide: [
      { service: "Benin Crisis Line", number: "229-21-30-00-00", description: "Crisis counseling" }
    ]
  },
  BW: {
    name: "Botswana",
    code: "BW",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Botswana Mental Health", number: "267-395-3010", description: "Mental health services" }
    ],
    suicide: [
      { service: "Botswana Crisis Support", number: "267-395-3010", description: "Crisis intervention" }
    ]
  },
  BF: {
    name: "Burkina Faso",
    code: "BF",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Burkina Mental Health", number: "226-25-30-00-00", description: "Mental health support" }
    ],
    suicide: [
      { service: "Burkina Crisis Line", number: "226-25-30-00-00", description: "Crisis counseling" }
    ]
  },
  BI: {
    name: "Burundi",
    code: "BI",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Burundi Mental Health", number: "257-22-22-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Burundi Crisis Support", number: "257-22-22-00-00", description: "Crisis intervention" }
    ]
  },
  CV: {
    name: "Cape Verde",
    code: "CV",
    emergency: [
      { service: "Police", number: "132", description: "Police emergency" },
      { service: "Fire/Medical", number: "131", description: "Fire and medical emergency" }
    ],
    mentalHealth: [
      { service: "Cape Verde Mental Health", number: "238-260-00-00", description: "Mental health support" }
    ],
    suicide: [
      { service: "Cape Verde Crisis Line", number: "238-260-00-00", description: "Crisis counseling" }
    ]
  },
  CM: {
    name: "Cameroon",
    code: "CM",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Cameroon Mental Health", number: "237-222-23-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Cameroon Crisis Support", number: "237-222-23-00-00", description: "Crisis intervention" }
    ]
  },
  CF: {
    name: "Central African Republic",
    code: "CF",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "CAR Mental Health", number: "236-21-61-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "CAR Crisis Line", number: "236-21-61-00-00", description: "Crisis counseling" }
    ]
  },
  TD: {
    name: "Chad",
    code: "TD",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Chad Mental Health", number: "235-22-51-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Chad Crisis Support", number: "235-22-51-00-00", description: "Crisis intervention" }
    ]
  },
  KM: {
    name: "Comoros",
    code: "KM",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Comoros Mental Health", number: "269-73-10-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Comoros Crisis Line", number: "269-73-10-00", description: "Crisis counseling" }
    ]
  },
  CG: {
    name: "Republic of the Congo",
    code: "CG",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Congo Mental Health", number: "242-281-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Congo Crisis Support", number: "242-281-00-00", description: "Crisis intervention" }
    ]
  },
  CD: {
    name: "Democratic Republic of the Congo",
    code: "CD",
    emergency: [
      { service: "Police", number: "112", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "DRC Mental Health", number: "243-12-345-6789", description: "Mental health services" }
    ],
    suicide: [
      { service: "DRC Crisis Line", number: "243-12-345-6789", description: "Crisis counseling" }
    ]
  },
  DJ: {
    name: "Djibouti",
    code: "DJ",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Djibouti Mental Health", number: "253-35-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Djibouti Crisis Support", number: "253-35-00-00", description: "Crisis intervention" }
    ]
  },
  GQ: {
    name: "Equatorial Guinea",
    code: "GQ",
    emergency: [
      { service: "Police", number: "114", description: "Police emergency" },
      { service: "Fire", number: "115", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Equatorial Guinea Mental Health", number: "240-333-092-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Equatorial Guinea Crisis Line", number: "240-333-092-000", description: "Crisis counseling" }
    ]
  },
  ER: {
    name: "Eritrea",
    code: "ER",
    emergency: [
      { service: "Police", number: "127", description: "Police emergency" },
      { service: "Fire", number: "144", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Eritrea Mental Health", number: "291-1-120-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Eritrea Crisis Support", number: "291-1-120-000", description: "Crisis intervention" }
    ]
  },
  SZ: {
    name: "Eswatini",
    code: "SZ",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Eswatini Mental Health", number: "268-2404-2000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Eswatini Crisis Line", number: "268-2404-2000", description: "Crisis counseling" }
    ]
  },
  ET: {
    name: "Ethiopia",
    code: "ET",
    emergency: [
      { service: "Police", number: "991", description: "Police emergency" },
      { service: "Fire", number: "939", description: "Fire emergency" },
      { service: "Medical Emergency", number: "907", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Ethiopia Mental Health", number: "251-11-551-7070", description: "Mental health services" }
    ],
    suicide: [
      { service: "Ethiopia Crisis Support", number: "251-11-551-7070", description: "Crisis intervention" }
    ]
  },
  GA: {
    name: "Gabon",
    code: "GA",
    emergency: [
      { service: "Police", number: "1730", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Gabon Mental Health", number: "241-76-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Gabon Crisis Line", number: "241-76-00-00", description: "Crisis counseling" }
    ]
  },
  GM: {
    name: "Gambia",
    code: "GM",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Gambia Mental Health", number: "220-422-6644", description: "Mental health services" }
    ],
    suicide: [
      { service: "Gambia Crisis Support", number: "220-422-6644", description: "Crisis intervention" }
    ]
  },
  GH: {
    name: "Ghana",
    code: "GH",
    emergency: [
      { service: "Police", number: "191", description: "Police emergency" },
      { service: "Fire", number: "192", description: "Fire emergency" },
      { service: "Medical Emergency", number: "193", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Ghana Mental Health", number: "233-302-665-401", description: "Mental health services" }
    ],
    suicide: [
      { service: "Ghana Crisis Line", number: "233-302-665-401", description: "Crisis counseling" }
    ]
  },
  GN: {
    name: "Guinea",
    code: "GN",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Guinea Mental Health", number: "224-664-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Guinea Crisis Support", number: "224-664-00-00", description: "Crisis intervention" }
    ]
  },
  GW: {
    name: "Guinea-Bissau",
    code: "GW",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Guinea-Bissau Mental Health", number: "245-320-1000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Guinea-Bissau Crisis Line", number: "245-320-1000", description: "Crisis counseling" }
    ]
  },
  CI: {
    name: "Ivory Coast",
    code: "CI",
    emergency: [
      { service: "Police", number: "111", description: "Police emergency" },
      { service: "Fire", number: "180", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Ivory Coast Mental Health", number: "225-20-21-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Ivory Coast Crisis Support", number: "225-20-21-00-00", description: "Crisis intervention" }
    ]
  },
  KE: {
    name: "Kenya",
    code: "KE",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "999", description: "Fire emergency" },
      { service: "Medical Emergency", number: "999", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Kenya Mental Health", number: "254-722-178-177", description: "Mental health services" },
      { service: "Befrienders Kenya", number: "254-722-178-177", description: "Crisis support and counseling" }
    ],
    suicide: [
      { service: "Kenya Crisis Line", number: "254-722-178-177", description: "Suicide prevention support" }
    ]
  },
  LS: {
    name: "Lesotho",
    code: "LS",
    emergency: [
      { service: "Police", number: "123", description: "Police emergency" },
      { service: "Fire", number: "122", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Lesotho Mental Health", number: "266-2232-5000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Lesotho Crisis Support", number: "266-2232-5000", description: "Crisis intervention" }
    ]
  },
  LR: {
    name: "Liberia",
    code: "LR",
    emergency: [
      { service: "Police", number: "911", description: "Police emergency" },
      { service: "Fire", number: "911", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Liberia Mental Health", number: "231-770-456-789", description: "Mental health services" }
    ],
    suicide: [
      { service: "Liberia Crisis Line", number: "231-770-456-789", description: "Crisis counseling" }
    ]
  },
  LY: {
    name: "Libya",
    code: "LY",
    emergency: [
      { service: "Police", number: "1515", description: "Police emergency" },
      { service: "Fire", number: "180", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Libya Mental Health", number: "218-21-333-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Libya Crisis Support", number: "218-21-333-0000", description: "Crisis intervention" }
    ]
  },
  MG: {
    name: "Madagascar",
    code: "MG",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Madagascar Mental Health", number: "261-20-22-000-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Madagascar Crisis Line", number: "261-20-22-000-00", description: "Crisis counseling" }
    ]
  },
  MW: {
    name: "Malawi",
    code: "MW",
    emergency: [
      { service: "Police", number: "997", description: "Police emergency" },
      { service: "Fire", number: "998", description: "Fire emergency" },
      { service: "Medical Emergency", number: "998", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Malawi Mental Health", number: "265-1-789-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Malawi Crisis Support", number: "265-1-789-000", description: "Crisis intervention" }
    ]
  },
  ML: {
    name: "Mali",
    code: "ML",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Mali Mental Health", number: "223-20-22-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Mali Crisis Line", number: "223-20-22-00-00", description: "Crisis counseling" }
    ]
  },
  MR: {
    name: "Mauritania",
    code: "MR",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Mauritania Mental Health", number: "222-525-1000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Mauritania Crisis Support", number: "222-525-1000", description: "Crisis intervention" }
    ]
  },
  MU: {
    name: "Mauritius",
    code: "MU",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Mauritius Mental Health", number: "230-424-7792", description: "Mental health services" }
    ],
    suicide: [
      { service: "Mauritius Crisis Line", number: "230-424-7792", description: "Crisis counseling" }
    ]
  },
  MA: {
    name: "Morocco",
    code: "MA",
    emergency: [
      { service: "Police", number: "19", description: "Police emergency" },
      { service: "Fire", number: "15", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Morocco Mental Health", number: "212-537-77-77-77", description: "Mental health services" }
    ],
    suicide: [
      { service: "Morocco Crisis Support", number: "212-537-77-77-77", description: "Crisis intervention" }
    ]
  },
  MZ: {
    name: "Mozambique",
    code: "MZ",
    emergency: [
      { service: "Police", number: "119", description: "Police emergency" },
      { service: "Fire", number: "198", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Mozambique Mental Health", number: "258-21-491-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Mozambique Crisis Line", number: "258-21-491-000", description: "Crisis counseling" }
    ]
  },
  NA: {
    name: "Namibia",
    code: "NA",
    emergency: [
      { service: "Police", number: "10111", description: "Police emergency" },
      { service: "Fire", number: "2032270", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Namibia Mental Health", number: "264-61-203-9111", description: "Mental health services" }
    ],
    suicide: [
      { service: "Namibia Crisis Support", number: "264-61-203-9111", description: "Crisis intervention" }
    ]
  },
  NE: {
    name: "Niger",
    code: "NE",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Niger Mental Health", number: "227-20-73-00-00", description: "Mental health services" }
    ],
    suicide: [
      { service: "Niger Crisis Line", number: "227-20-73-00-00", description: "Crisis counseling" }
    ]
  },
  RW: {
    name: "Rwanda",
    code: "RW",
    emergency: [
      { service: "Police", number: "112", description: "Police emergency" },
      { service: "Fire", number: "112", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Rwanda Mental Health", number: "250-788-300-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Rwanda Crisis Support", number: "250-788-300-000", description: "Crisis intervention" }
    ]
  },
  ST: {
    name: "São Tomé and Príncipe",
    code: "ST",
    emergency: [
      { service: "Police", number: "222", description: "Police emergency" },
      { service: "Fire", number: "112", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "São Tomé Mental Health", number: "239-222-2000", description: "Mental health services" }
    ],
    suicide: [
      { service: "São Tomé Crisis Line", number: "239-222-2000", description: "Crisis counseling" }
    ]
  },
  SN: {
    name: "Senegal",
    code: "SN",
    emergency: [
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Senegal Mental Health", number: "221-33-823-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Senegal Crisis Support", number: "221-33-823-0000", description: "Crisis intervention" }
    ]
  },
  SC: {
    name: "Seychelles",
    code: "SC",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Seychelles Mental Health", number: "248-324-3000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Seychelles Crisis Line", number: "248-324-3000", description: "Crisis counseling" }
    ]
  },
  SL: {
    name: "Sierra Leone",
    code: "SL",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "999", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Sierra Leone Mental Health", number: "232-22-224-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Sierra Leone Crisis Support", number: "232-22-224-000", description: "Crisis intervention" }
    ]
  },
  SO: {
    name: "Somalia",
    code: "SO",
    emergency: [
      { service: "Police", number: "888", description: "Police emergency" },
      { service: "Fire", number: "555", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Somalia Mental Health", number: "252-1-234-5678", description: "Mental health services" }
    ],
    suicide: [
      { service: "Somalia Crisis Line", number: "252-1-234-5678", description: "Crisis counseling" }
    ]
  },
  SS: {
    name: "South Sudan",
    code: "SS",
    emergency: [
      { service: "Police", number: "777", description: "Police emergency" },
      { service: "Fire", number: "999", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "South Sudan Mental Health", number: "211-123-456-789", description: "Mental health services" }
    ],
    suicide: [
      { service: "South Sudan Crisis Support", number: "211-123-456-789", description: "Crisis intervention" }
    ]
  },
  SD: {
    name: "Sudan",
    code: "SD",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "998", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Sudan Mental Health", number: "249-183-000-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Sudan Crisis Line", number: "249-183-000-000", description: "Crisis counseling" }
    ]
  },
  TZ: {
    name: "Tanzania",
    code: "TZ",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "114", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Tanzania Mental Health", number: "255-22-211-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Tanzania Crisis Support", number: "255-22-211-0000", description: "Crisis intervention" }
    ]
  },
  TG: {
    name: "Togo",
    code: "TG",
    emergency: [
      { service: "Police", number: "101", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Togo Mental Health", number: "228-222-1000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Togo Crisis Line", number: "228-222-1000", description: "Crisis counseling" }
    ]
  },
  TN: {
    name: "Tunisia",
    code: "TN",
    emergency: [
      { service: "Police", number: "197", description: "Police emergency" },
      { service: "Fire", number: "198", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Tunisia Mental Health", number: "216-71-560-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Tunisia Crisis Support", number: "216-71-560-000", description: "Crisis intervention" }
    ]
  },
  UG: {
    name: "Uganda",
    code: "UG",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "999", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Uganda Mental Health", number: "256-414-530-692", description: "Mental health services" }
    ],
    suicide: [
      { service: "Uganda Crisis Line", number: "256-414-530-692", description: "Crisis counseling" }
    ]
  },
  ZM: {
    name: "Zambia",
    code: "ZM",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "993", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Zambia Mental Health", number: "260-211-253-956", description: "Mental health services" }
    ],
    suicide: [
      { service: "Zambia Crisis Support", number: "260-211-253-956", description: "Crisis intervention" }
    ]
  },
  ZW: {
    name: "Zimbabwe",
    code: "ZW",
    emergency: [
      { service: "Police", number: "995", description: "Police emergency" },
      { service: "Fire", number: "993", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Zimbabwe Mental Health", number: "263-4-700-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Zimbabwe Crisis Line", number: "263-4-700-000", description: "Crisis counseling" }
    ]
  },

  // Asia (Additional)
  AF: {
    name: "Afghanistan",
    code: "AF",
    emergency: [
      { service: "Police", number: "119", description: "Police emergency" },
      { service: "Fire", number: "119", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Afghanistan Mental Health", number: "93-20-220-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Afghanistan Crisis Support", number: "93-20-220-0000", description: "Crisis intervention" }
    ]
  },
  AM: {
    name: "Armenia",
    code: "AM",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Armenia Mental Health", number: "374-10-544-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Armenia Crisis Line", number: "374-10-544-000", description: "Crisis counseling" }
    ]
  },
  AZ: {
    name: "Azerbaijan",
    code: "AZ",
    emergency: [
      { service: "Police", number: "102", description: "Police emergency" },
      { service: "Fire", number: "101", description: "Fire emergency" },
      { service: "Medical Emergency", number: "103", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Azerbaijan Mental Health", number: "994-12-498-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Azerbaijan Crisis Support", number: "994-12-498-0000", description: "Crisis intervention" }
    ]
  },
  BH: {
    name: "Bahrain",
    code: "BH",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Bahrain Mental Health", number: "973-1724-4000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bahrain Crisis Line", number: "973-1724-4000", description: "Crisis counseling" }
    ]
  },
  BD: {
    name: "Bangladesh",
    code: "BD",
    emergency: [
      { service: "Police", number: "999", description: "Police emergency" },
      { service: "Fire", number: "199", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Bangladesh Mental Health", number: "880-2-8616789", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bangladesh Crisis Support", number: "880-2-8616789", description: "Crisis intervention" }
    ]
  },
  BT: {
    name: "Bhutan",
    code: "BT",
    emergency: [
      { service: "Police", number: "113", description: "Police emergency" },
      { service: "Fire", number: "110", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Bhutan Mental Health", number: "975-2-322-001", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bhutan Crisis Line", number: "975-2-322-001", description: "Crisis counseling" }
    ]
  },
  BN: {
    name: "Brunei",
    code: "BN",
    emergency: [
      { service: "Emergency Services", number: "991", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Brunei Mental Health", number: "673-238-1000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Brunei Crisis Support", number: "673-238-1000", description: "Crisis intervention" }
    ]
  },
  KH: {
    name: "Cambodia",
    code: "KH",
    emergency: [
      { service: "Police", number: "117", description: "Police emergency" },
      { service: "Fire", number: "118", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Cambodia Mental Health", number: "855-23-880-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Cambodia Crisis Line", number: "855-23-880-000", description: "Crisis counseling" }
    ]
  },
  CY: {
    name: "Cyprus",
    code: "CY",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Cyprus Mental Health", number: "357-22-305-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Cyprus Crisis Support", number: "357-22-305-000", description: "Crisis intervention" }
    ]
  },
  GE: {
    name: "Georgia",
    code: "GE",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Georgia Mental Health", number: "995-32-251-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Georgia Crisis Line", number: "995-32-251-0000", description: "Crisis counseling" }
    ]
  },
  IQ: {
    name: "Iraq",
    code: "IQ",
    emergency: [
      { service: "Police", number: "104", description: "Police emergency" },
      { service: "Fire", number: "115", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Iraq Mental Health", number: "964-1-719-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Iraq Crisis Support", number: "964-1-719-0000", description: "Crisis intervention" }
    ]
  },
  IR: {
    name: "Iran",
    code: "IR",
    emergency: [
      { service: "Police", number: "110", description: "Police emergency" },
      { service: "Fire", number: "125", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Iran Mental Health", number: "98-21-6670-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Iran Crisis Line", number: "98-21-6670-0000", description: "Crisis counseling" }
    ]
  },
  JO: {
    name: "Jordan",
    code: "JO",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Jordan Mental Health", number: "962-6-560-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Jordan Crisis Support", number: "962-6-560-0000", description: "Crisis intervention" }
    ]
  },
  KZ: {
    name: "Kazakhstan",
    code: "KZ",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Kazakhstan Mental Health", number: "7-727-292-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Kazakhstan Crisis Line", number: "7-727-292-0000", description: "Crisis counseling" }
    ]
  },
  KW: {
    name: "Kuwait",
    code: "KW",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Kuwait Mental Health", number: "965-2481-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Kuwait Crisis Support", number: "965-2481-0000", description: "Crisis intervention" }
    ]
  },
  KG: {
    name: "Kyrgyzstan",
    code: "KG",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Kyrgyzstan Mental Health", number: "996-312-625-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Kyrgyzstan Crisis Line", number: "996-312-625-000", description: "Crisis counseling" }
    ]
  },
  LA: {
    name: "Laos",
    code: "LA",
    emergency: [
      { service: "Police", number: "191", description: "Police emergency" },
      { service: "Fire", number: "190", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Laos Mental Health", number: "856-21-214-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Laos Crisis Support", number: "856-21-214-000", description: "Crisis intervention" }
    ]
  },
  LB: {
    name: "Lebanon",
    code: "LB",
    emergency: [
      { service: "Police", number: "112", description: "Police emergency" },
      { service: "Fire", number: "175", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Lebanon Mental Health", number: "961-1-340-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Lebanon Crisis Line", number: "961-1-340-000", description: "Crisis counseling" }
    ]
  },
  MV: {
    name: "Maldives",
    code: "MV",
    emergency: [
      { service: "Emergency Services", number: "119", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Maldives Mental Health", number: "960-330-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Maldives Crisis Support", number: "960-330-0000", description: "Crisis intervention" }
    ]
  },
  MN: {
    name: "Mongolia",
    code: "MN",
    emergency: [
      { service: "Emergency Services", number: "102", description: "Police emergency" },
      { service: "Fire", number: "101", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Mongolia Mental Health", number: "976-11-320-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Mongolia Crisis Line", number: "976-11-320-000", description: "Crisis counseling" }
    ]
  },
  MM: {
    name: "Myanmar",
    code: "MM",
    emergency: [
      { service: "Police", number: "199", description: "Police emergency" },
      { service: "Fire", number: "191", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Myanmar Mental Health", number: "95-1-370-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Myanmar Crisis Support", number: "95-1-370-000", description: "Crisis intervention" }
    ]
  },
  NP: {
    name: "Nepal",
    code: "NP",
    emergency: [
      { service: "Police", number: "100", description: "Police emergency" },
      { service: "Fire", number: "101", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Nepal Mental Health", number: "977-1-441-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Nepal Crisis Line", number: "977-1-441-0000", description: "Crisis counseling" }
    ]
  },
  OM: {
    name: "Oman",
    code: "OM",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Oman Mental Health", number: "968-2449-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Oman Crisis Support", number: "968-2449-0000", description: "Crisis intervention" }
    ]
  },
  PK: {
    name: "Pakistan",
    code: "PK",
    emergency: [
      { service: "Police", number: "15", description: "Police emergency" },
      { service: "Fire", number: "16", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Pakistan Mental Health", number: "92-21-3556-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Pakistan Crisis Line", number: "92-21-3556-0000", description: "Crisis counseling" }
    ]
  },
  QA: {
    name: "Qatar",
    code: "QA",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Qatar Mental Health", number: "974-4439-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Qatar Crisis Support", number: "974-4439-0000", description: "Crisis intervention" }
    ]
  },
  LK: {
    name: "Sri Lanka",
    code: "LK",
    emergency: [
      { service: "Police", number: "119", description: "Police emergency" },
      { service: "Fire", number: "110", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Sri Lanka Mental Health", number: "94-11-269-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Sri Lanka Crisis Line", number: "94-11-269-0000", description: "Crisis counseling" }
    ]
  },
  SY: {
    name: "Syria",
    code: "SY",
    emergency: [
      { service: "Police", number: "112", description: "Police emergency" },
      { service: "Fire", number: "113", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Syria Mental Health", number: "963-11-332-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Syria Crisis Support", number: "963-11-332-0000", description: "Crisis intervention" }
    ]
  },
  TJ: {
    name: "Tajikistan",
    code: "TJ",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Tajikistan Mental Health", number: "992-37-221-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Tajikistan Crisis Line", number: "992-37-221-0000", description: "Crisis counseling" }
    ]
  },
  TL: {
    name: "Timor-Leste",
    code: "TL",
    emergency: [
      { service: "Police", number: "112", description: "Police emergency" },
      { service: "Fire", number: "115", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Timor-Leste Mental Health", number: "670-331-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Timor-Leste Crisis Support", number: "670-331-0000", description: "Crisis intervention" }
    ]
  },
  TR: {
    name: "Turkey",
    code: "TR",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Turkey Mental Health", number: "90-312-585-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Turkey Crisis Line", number: "90-312-585-0000", description: "Crisis counseling" }
    ]
  },
  TM: {
    name: "Turkmenistan",
    code: "TM",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Turkmenistan Mental Health", number: "993-12-940-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Turkmenistan Crisis Support", number: "993-12-940-000", description: "Crisis intervention" }
    ]
  },
  UZ: {
    name: "Uzbekistan",
    code: "UZ",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Uzbekistan Mental Health", number: "998-71-120-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Uzbekistan Crisis Line", number: "998-71-120-0000", description: "Crisis counseling" }
    ]
  },
  VN: {
    name: "Vietnam",
    code: "VN",
    emergency: [
      { service: "Police", number: "113", description: "Police emergency" },
      { service: "Fire", number: "114", description: "Fire emergency" },
      { service: "Medical Emergency", number: "115", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Vietnam Mental Health", number: "84-24-3574-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Vietnam Crisis Support", number: "84-24-3574-0000", description: "Crisis intervention" }
    ]
  },
  YE: {
    name: "Yemen",
    code: "YE",
    emergency: [
      { service: "Police", number: "199", description: "Police emergency" },
      { service: "Fire", number: "191", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Yemen Mental Health", number: "967-1-274-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Yemen Crisis Line", number: "967-1-274-000", description: "Crisis counseling" }
    ]
  },

  // Europe (Additional)
  AD: {
    name: "Andorra",
    code: "AD",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Andorra Mental Health", number: "376-873-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Andorra Crisis Support", number: "376-873-000", description: "Crisis intervention" }
    ]
  },
  AT: {
    name: "Austria",
    code: "AT",
    emergency: [
      { service: "Emergency Services", number: "112", description: "European emergency number" },
      { service: "Police", number: "133", description: "Police emergency" },
      { service: "Fire", number: "122", description: "Fire emergency" },
      { service: "Medical Emergency", number: "144", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Telefonseelsorge Austria", number: "142", description: "24/7 crisis counseling" },
      { service: "Rat auf Draht", number: "147", description: "Youth crisis hotline" }
    ],
    suicide: [
      { service: "Telefonseelsorge", number: "142", description: "Suicide prevention support" }
    ]
  },
  BY: {
    name: "Belarus",
    code: "BY",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Belarus Mental Health", number: "375-17-290-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Belarus Crisis Line", number: "375-17-290-0000", description: "Crisis counseling" }
    ]
  },
  BE: {
    name: "Belgium",
    code: "BE",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Tele-Onthaal", number: "106", description: "24/7 emotional support" },
      { service: "Centre de Prévention du Suicide", number: "0800-32-123", description: "Suicide prevention center" }
    ],
    suicide: [
      { service: "Centre de Prévention du Suicide", number: "0800-32-123", description: "Suicide prevention support" }
    ]
  },
  BA: {
    name: "Bosnia and Herzegovina",
    code: "BA",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Bosnia Mental Health", number: "387-33-276-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bosnia Crisis Support", number: "387-33-276-000", description: "Crisis intervention" }
    ]
  },
  BG: {
    name: "Bulgaria",
    code: "BG",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Bulgaria Mental Health", number: "359-2-981-9393", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bulgaria Crisis Line", number: "359-2-981-9393", description: "Crisis counseling" }
    ]
  },
  HR: {
    name: "Croatia",
    code: "HR",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Croatia Mental Health", number: "385-1-482-9394", description: "Mental health services" }
    ],
    suicide: [
      { service: "Croatia Crisis Support", number: "385-1-482-9394", description: "Crisis intervention" }
    ]
  },
  CZ: {
    name: "Czech Republic",
    code: "CZ",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Linka důvěry", number: "116-111", description: "24/7 crisis hotline" },
      { service: "Pražská linka důvěry", number: "222-580-697", description: "Prague crisis line" }
    ],
    suicide: [
      { service: "Linka důvěry", number: "116-111", description: "Suicide prevention support" }
    ]
  },
  DK: {
    name: "Denmark",
    code: "DK",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Livslinien", number: "70-201-201", description: "24/7 suicide prevention hotline" },
      { service: "Børns Vilkår", number: "116-111", description: "Children's helpline" }
    ],
    suicide: [
      { service: "Livslinien", number: "70-201-201", description: "Suicide prevention and crisis support" }
    ]
  },
  EE: {
    name: "Estonia",
    code: "EE",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Estonia Mental Health", number: "372-631-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Estonia Crisis Line", number: "372-631-0000", description: "Crisis counseling" }
    ]
  },
  FI: {
    name: "Finland",
    code: "FI",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Finnish Association for Mental Health", number: "010-195-2000", description: "Mental health support" },
      { service: "Crisis helpline", number: "09-2525-0111", description: "24/7 crisis support" }
    ],
    suicide: [
      { service: "Crisis helpline", number: "09-2525-0111", description: "Suicide prevention support" }
    ]
  },
  GR: {
    name: "Greece",
    code: "GR",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "KLIMAKA", number: "1018", description: "24/7 mental health support" },
      { service: "SOS Help Line", number: "210-331-2500", description: "Crisis counseling" }
    ],
    suicide: [
      { service: "KLIMAKA", number: "1018", description: "Suicide prevention hotline" }
    ]
  },
  HU: {
    name: "Hungary",
    code: "HU",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "LESZ Országos Kríziskezelő", number: "116-123", description: "24/7 crisis hotline" },
      { service: "S.O.S. Lelki Elsősegély", number: "06-1-116-123", description: "Mental health first aid" }
    ],
    suicide: [
      { service: "LESZ", number: "116-123", description: "Suicide prevention support" }
    ]
  },
  IS: {
    name: "Iceland",
    code: "IS",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Iceland Mental Health", number: "354-581-2345", description: "Mental health services" }
    ],
    suicide: [
      { service: "Iceland Crisis Support", number: "354-581-2345", description: "Crisis intervention" }
    ]
  },
  IE: {
    name: "Ireland",
    code: "IE",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" },
      { service: "Emergency Services", number: "999", description: "Alternative emergency number" }
    ],
    mentalHealth: [
      { service: "Samaritans Ireland", number: "116-123", description: "24/7 emotional support" },
      { service: "Pieta House", number: "1800-247-247", description: "Suicide prevention and self-harm support" }
    ],
    suicide: [
      { service: "Pieta House", number: "1800-247-247", description: "Suicide prevention and crisis support" }
    ]
  },
  LV: {
    name: "Latvia",
    code: "LV",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Latvia Mental Health", number: "371-6722-2922", description: "Mental health services" }
    ],
    suicide: [
      { service: "Latvia Crisis Line", number: "371-6722-2922", description: "Crisis counseling" }
    ]
  },
  LI: {
    name: "Liechtenstein",
    code: "LI",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Liechtenstein Mental Health", number: "423-236-6060", description: "Mental health services" }
    ],
    suicide: [
      { service: "Liechtenstein Crisis Support", number: "423-236-6060", description: "Crisis intervention" }
    ]
  },
  LT: {
    name: "Lithuania",
    code: "LT",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Lithuania Mental Health", number: "370-5-278-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Lithuania Crisis Line", number: "370-5-278-0000", description: "Crisis counseling" }
    ]
  },
  LU: {
    name: "Luxembourg",
    code: "LU",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Luxembourg Mental Health", number: "352-45-45-45", description: "Mental health services" }
    ],
    suicide: [
      { service: "Luxembourg Crisis Support", number: "352-45-45-45", description: "Crisis intervention" }
    ]
  },
  MT: {
    name: "Malta",
    code: "MT",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Malta Mental Health", number: "356-2320-2500", description: "Mental health services" }
    ],
    suicide: [
      { service: "Malta Crisis Line", number: "356-2320-2500", description: "Crisis counseling" }
    ]
  },
  MD: {
    name: "Moldova",
    code: "MD",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Moldova Mental Health", number: "373-22-728-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Moldova Crisis Support", number: "373-22-728-000", description: "Crisis intervention" }
    ]
  },
  MC: {
    name: "Monaco",
    code: "MC",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Monaco Mental Health", number: "377-9798-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Monaco Crisis Line", number: "377-9798-0000", description: "Crisis counseling" }
    ]
  },
  ME: {
    name: "Montenegro",
    code: "ME",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Montenegro Mental Health", number: "382-20-405-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Montenegro Crisis Support", number: "382-20-405-000", description: "Crisis intervention" }
    ]
  },
  MK: {
    name: "North Macedonia",
    code: "MK",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "North Macedonia Mental Health", number: "389-2-311-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "North Macedonia Crisis Line", number: "389-2-311-0000", description: "Crisis counseling" }
    ]
  },
  PL: {
    name: "Poland",
    code: "PL",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Telefon Zaufania", number: "116-123", description: "24/7 crisis hotline" },
      { service: "Centrum Wsparcia", number: "800-70-2222", description: "Mental health support center" }
    ],
    suicide: [
      { service: "Telefon Zaufania", number: "116-123", description: "Suicide prevention support" }
    ]
  },
  PT: {
    name: "Portugal",
    code: "PT",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "SOS Voz Amiga", number: "213-544-545", description: "24/7 emotional support" },
      { service: "Linha de Apoio", number: "808-200-204", description: "Mental health support line" }
    ],
    suicide: [
      { service: "SOS Voz Amiga", number: "213-544-545", description: "Suicide prevention support" }
    ]
  },
  RO: {
    name: "Romania",
    code: "RO",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Romania Mental Health", number: "40-21-323-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Romania Crisis Line", number: "40-21-323-0000", description: "Crisis counseling" }
    ]
  },
  RU: {
    name: "Russia",
    code: "RU",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Russia Mental Health", number: "7-495-625-3101", description: "Mental health services" }
    ],
    suicide: [
      { service: "Russia Crisis Support", number: "7-495-625-3101", description: "Crisis intervention" }
    ]
  },
  SM: {
    name: "San Marino",
    code: "SM",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "San Marino Mental Health", number: "378-0549-994-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "San Marino Crisis Line", number: "378-0549-994-000", description: "Crisis counseling" }
    ]
  },
  RS: {
    name: "Serbia",
    code: "RS",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Serbia Mental Health", number: "381-11-240-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Serbia Crisis Support", number: "381-11-240-0000", description: "Crisis intervention" }
    ]
  },
  SK: {
    name: "Slovakia",
    code: "SK",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Slovakia Mental Health", number: "421-2-544-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Slovakia Crisis Line", number: "421-2-544-0000", description: "Crisis counseling" }
    ]
  },
  SI: {
    name: "Slovenia",
    code: "SI",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Slovenia Mental Health", number: "386-1-520-9999", description: "Mental health services" }
    ],
    suicide: [
      { service: "Slovenia Crisis Support", number: "386-1-520-9999", description: "Crisis intervention" }
    ]
  },
  CH: {
    name: "Switzerland",
    code: "CH",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Die Dargebotene Hand", number: "143", description: "24/7 crisis hotline" },
      { service: "Pro Juventute", number: "147", description: "Youth crisis support" }
    ],
    suicide: [
      { service: "Die Dargebotene Hand", number: "143", description: "Suicide prevention support" }
    ]
  },
  UA: {
    name: "Ukraine",
    code: "UA",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Ukraine Mental Health", number: "380-44-590-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Ukraine Crisis Line", number: "380-44-590-0000", description: "Crisis counseling" }
    ]
  },
  VA: {
    name: "Vatican City",
    code: "VA",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Vatican Mental Health", number: "39-06-6988-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Vatican Crisis Support", number: "39-06-6988-0000", description: "Crisis intervention" }
    ]
  },

  // North America (Additional)
  AG: {
    name: "Antigua and Barbuda",
    code: "AG",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Antigua Mental Health", number: "1-268-462-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Antigua Crisis Support", number: "1-268-462-0000", description: "Crisis intervention" }
    ]
  },
  BS: {
    name: "Bahamas",
    code: "BS",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Bahamas Mental Health", number: "1-242-302-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bahamas Crisis Line", number: "1-242-302-0000", description: "Crisis counseling" }
    ]
  },
  BB: {
    name: "Barbados",
    code: "BB",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Barbados Mental Health", number: "1-246-436-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Barbados Crisis Support", number: "1-246-436-0000", description: "Crisis intervention" }
    ]
  },
  BZ: {
    name: "Belize",
    code: "BZ",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Belize Mental Health", number: "501-223-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Belize Crisis Line", number: "501-223-0000", description: "Crisis counseling" }
    ]
  },
  CR: {
    name: "Costa Rica",
    code: "CR",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Costa Rica Mental Health", number: "506-2223-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Costa Rica Crisis Support", number: "506-2223-0000", description: "Crisis intervention" }
    ]
  },
  CU: {
    name: "Cuba",
    code: "CU",
    emergency: [
      { service: "Police", number: "106", description: "Police emergency" },
      { service: "Fire", number: "105", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Cuba Mental Health", number: "53-7-838-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Cuba Crisis Line", number: "53-7-838-0000", description: "Crisis counseling" }
    ]
  },
  DM: {
    name: "Dominica",
    code: "DM",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Dominica Mental Health", number: "1-767-448-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Dominica Crisis Support", number: "1-767-448-0000", description: "Crisis intervention" }
    ]
  },
  DO: {
    name: "Dominican Republic",
    code: "DO",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Dominican Republic Mental Health", number: "1-809-688-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Dominican Republic Crisis Line", number: "1-809-688-0000", description: "Crisis counseling" }
    ]
  },
  SV: {
    name: "El Salvador",
    code: "SV",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "El Salvador Mental Health", number: "503-2221-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "El Salvador Crisis Support", number: "503-2221-0000", description: "Crisis intervention" }
    ]
  },
  GD: {
    name: "Grenada",
    code: "GD",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Grenada Mental Health", number: "1-473-440-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Grenada Crisis Line", number: "1-473-440-0000", description: "Crisis counseling" }
    ]
  },
  GT: {
    name: "Guatemala",
    code: "GT",
    emergency: [
      { service: "Emergency Services", number: "110", description: "Police emergency" },
      { service: "Fire", number: "122", description: "Fire emergency" },
      { service: "Medical Emergency", number: "123", description: "Medical emergency services" }
    ],
    mentalHealth: [
      { service: "Guatemala Mental Health", number: "502-2230-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Guatemala Crisis Support", number: "502-2230-0000", description: "Crisis intervention" }
    ]
  },
  HT: {
    name: "Haiti",
    code: "HT",
    emergency: [
      { service: "Police", number: "114", description: "Police emergency" },
      { service: "Fire", number: "115", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Haiti Mental Health", number: "509-2816-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Haiti Crisis Line", number: "509-2816-0000", description: "Crisis counseling" }
    ]
  },
  HN: {
    name: "Honduras",
    code: "HN",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Honduras Mental Health", number: "504-2221-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Honduras Crisis Support", number: "504-2221-0000", description: "Crisis intervention" }
    ]
  },
  JM: {
    name: "Jamaica",
    code: "JM",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Jamaica Mental Health", number: "1-876-922-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Jamaica Crisis Line", number: "1-876-922-0000", description: "Crisis counseling" }
    ]
  },
  KN: {
    name: "Saint Kitts and Nevis",
    code: "KN",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Saint Kitts Mental Health", number: "1-869-465-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Saint Kitts Crisis Support", number: "1-869-465-0000", description: "Crisis intervention" }
    ]
  },
  LC: {
    name: "Saint Lucia",
    code: "LC",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Saint Lucia Mental Health", number: "1-758-452-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Saint Lucia Crisis Line", number: "1-758-452-0000", description: "Crisis counseling" }
    ]
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Saint Vincent Mental Health", number: "1-784-457-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Saint Vincent Crisis Support", number: "1-784-457-0000", description: "Crisis intervention" }
    ]
  },
  TT: {
    name: "Trinidad and Tobago",
    code: "TT",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Trinidad Mental Health", number: "1-868-622-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Trinidad Crisis Line", number: "1-868-622-0000", description: "Crisis counseling" }
    ]
  },
  NI: {
    name: "Nicaragua",
    code: "NI",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Nicaragua Mental Health", number: "505-2222-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Nicaragua Crisis Support", number: "505-2222-0000", description: "Crisis intervention" }
    ]
  },
  PA: {
    name: "Panama",
    code: "PA",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Panama Mental Health", number: "507-511-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Panama Crisis Line", number: "507-511-0000", description: "Crisis counseling" }
    ]
  },

  // South America (Additional)
  BO: {
    name: "Bolivia",
    code: "BO",
    emergency: [
      { service: "Police", number: "110", description: "Police emergency" },
      { service: "Fire", number: "119", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Bolivia Mental Health", number: "591-2-244-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Bolivia Crisis Support", number: "591-2-244-0000", description: "Crisis intervention" }
    ]
  },
  CO: {
    name: "Colombia",
    code: "CO",
    emergency: [
      { service: "Emergency Services", number: "123", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Colombia Mental Health", number: "57-1-594-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Colombia Crisis Line", number: "57-1-594-0000", description: "Crisis counseling" }
    ]
  },
  EC: {
    name: "Ecuador",
    code: "EC",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Ecuador Mental Health", number: "593-2-256-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Ecuador Crisis Support", number: "593-2-256-0000", description: "Crisis intervention" }
    ]
  },
  FK: {
    name: "Falkland Islands",
    code: "FK",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Falkland Islands Mental Health", number: "500-27000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Falkland Islands Crisis Line", number: "500-27000", description: "Crisis counseling" }
    ]
  },
  GF: {
    name: "French Guiana",
    code: "GF",
    emergency: [
      { service: "Emergency Services", number: "15", description: "Medical emergency" },
      { service: "Police", number: "17", description: "Police emergency" },
      { service: "Fire", number: "18", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "French Guiana Mental Health", number: "594-594-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "French Guiana Crisis Support", number: "594-594-000", description: "Crisis intervention" }
    ]
  },
  GY: {
    name: "Guyana",
    code: "GY",
    emergency: [
      { service: "Police", number: "911", description: "Police emergency" },
      { service: "Fire", number: "912", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Guyana Mental Health", number: "592-225-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Guyana Crisis Line", number: "592-225-0000", description: "Crisis counseling" }
    ]
  },
  PY: {
    name: "Paraguay",
    code: "PY",
    emergency: [
      { service: "Police", number: "911", description: "Police emergency" },
      { service: "Fire", number: "132", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Paraguay Mental Health", number: "595-21-204-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Paraguay Crisis Support", number: "595-21-204-000", description: "Crisis intervention" }
    ]
  },
  PE: {
    name: "Peru",
    code: "PE",
    emergency: [
      { service: "Emergency Services", number: "105", description: "Police emergency" },
      { service: "Fire", number: "116", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Peru Mental Health", number: "51-1-273-8000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Peru Crisis Line", number: "51-1-273-8000", description: "Crisis counseling" }
    ]
  },
  SR: {
    name: "Suriname",
    code: "SR",
    emergency: [
      { service: "Police", number: "115", description: "Police emergency" },
      { service: "Fire", number: "110", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Suriname Mental Health", number: "597-472-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Suriname Crisis Support", number: "597-472-000", description: "Crisis intervention" }
    ]
  },
  UY: {
    name: "Uruguay",
    code: "UY",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Uruguay Mental Health", number: "598-2-480-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Uruguay Crisis Line", number: "598-2-480-0000", description: "Crisis counseling" }
    ]
  },
  VE: {
    name: "Venezuela",
    code: "VE",
    emergency: [
      { service: "Police", number: "171", description: "Police emergency" },
      { service: "Fire", number: "171", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Venezuela Mental Health", number: "58-212-576-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Venezuela Crisis Support", number: "58-212-576-0000", description: "Crisis intervention" }
    ]
  },

  // Oceania (Additional)
  FJ: {
    name: "Fiji",
    code: "FJ",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Fiji Mental Health", number: "679-331-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Fiji Crisis Support", number: "679-331-0000", description: "Crisis intervention" }
    ]
  },
  KI: {
    name: "Kiribati",
    code: "KI",
    emergency: [
      { service: "Police", number: "192", description: "Police emergency" },
      { service: "Fire", number: "193", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Kiribati Mental Health", number: "686-21-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Kiribati Crisis Line", number: "686-21-000", description: "Crisis counseling" }
    ]
  },
  MH: {
    name: "Marshall Islands",
    code: "MH",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Marshall Islands Mental Health", number: "692-625-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Marshall Islands Crisis Support", number: "692-625-0000", description: "Crisis intervention" }
    ]
  },
  FM: {
    name: "Micronesia",
    code: "FM",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Micronesia Mental Health", number: "691-320-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Micronesia Crisis Line", number: "691-320-0000", description: "Crisis counseling" }
    ]
  },
  NR: {
    name: "Nauru",
    code: "NR",
    emergency: [
      { service: "Emergency Services", number: "110", description: "Police emergency" },
      { service: "Fire", number: "119", description: "Fire emergency" }
    ],
    mentalHealth: [
      { service: "Nauru Mental Health", number: "674-444-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Nauru Crisis Support", number: "674-444-0000", description: "Crisis intervention" }
    ]
  },
  PW: {
    name: "Palau",
    code: "PW",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Palau Mental Health", number: "680-488-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Palau Crisis Line", number: "680-488-0000", description: "Crisis counseling" }
    ]
  },
  PG: {
    name: "Papua New Guinea",
    code: "PG",
    emergency: [
      { service: "Emergency Services", number: "000", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Papua New Guinea Mental Health", number: "675-325-0000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Papua New Guinea Crisis Support", number: "675-325-0000", description: "Crisis intervention" }
    ]
  },
  WS: {
    name: "Samoa",
    code: "WS",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Samoa Mental Health", number: "685-20-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Samoa Crisis Line", number: "685-20-000", description: "Crisis counseling" }
    ]
  },
  SB: {
    name: "Solomon Islands",
    code: "SB",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Solomon Islands Mental Health", number: "677-22-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Solomon Islands Crisis Support", number: "677-22-000", description: "Crisis intervention" }
    ]
  },
  TO: {
    name: "Tonga",
    code: "TO",
    emergency: [
      { service: "Emergency Services", number: "999", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Tonga Mental Health", number: "676-23-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Tonga Crisis Line", number: "676-23-000", description: "Crisis counseling" }
    ]
  },
  TV: {
    name: "Tuvalu",
    code: "TV",
    emergency: [
      { service: "Emergency Services", number: "911", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Tuvalu Mental Health", number: "688-20-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Tuvalu Crisis Support", number: "688-20-000", description: "Crisis intervention" }
    ]
  },
  VU: {
    name: "Vanuatu",
    code: "VU",
    emergency: [
      { service: "Emergency Services", number: "112", description: "Police, Fire, Medical Emergency" }
    ],
    mentalHealth: [
      { service: "Vanuatu Mental Health", number: "678-22-000", description: "Mental health services" }
    ],
    suicide: [
      { service: "Vanuatu Crisis Line", number: "678-22-000", description: "Crisis counseling" }
    ]
  }
};

export default function CrisisSupportPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const countryData = selectedCountry ? emergencyData[selectedCountry] : null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9dcd1] via-white to-[#ecb4a7]">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" onClick={scrollToTop} className="inline-flex items-center text-[#59291f] hover:text-[#59291f]/80 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#59291f]">Crisis Support</h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Immediate help is available. Select your country to access emergency numbers and crisis support resources.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">If you're in immediate danger</h3>
              <p className="text-red-700">Please contact emergency services immediately or go to your nearest emergency room.</p>
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-[#59291f]">
              <Globe className="h-5 w-5 mr-2" />
              Select Your Country
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Choose from {Object.keys(emergencyData).length} countries worldwide
            </p>
          </CardHeader>
          <CardContent>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose your country" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {Object.entries(emergencyData)
                  .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                  .map(([code, data]) => (
                    <SelectItem key={code} value={code}>
                      {data.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Emergency Numbers Display */}
        {countryData && (
          <div className="space-y-6">
            {/* Emergency Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Services - {countryData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {countryData.emergency.map((service, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-red-800">{service.service}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-700 hover:bg-red-100"
                          onClick={() => window.location.href = `tel:${service.number}`}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          {service.number}
                        </Button>
                      </div>
                      <p className="text-sm text-red-700">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mental Health Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#59291f]">
                  <Heart className="h-5 w-5 mr-2" />
                  Mental Health Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {countryData.mentalHealth.map((service, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-800">{service.service}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-100"
                          onClick={() => window.location.href = `tel:${service.number}`}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          {service.number}
                        </Button>
                      </div>
                      <p className="text-sm text-blue-700">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suicide Prevention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Heart className="h-5 w-5 mr-2" />
                  Suicide Prevention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {countryData.suicide.map((service, index) => (
                    <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-purple-800">{service.service}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-300 text-purple-700 hover:bg-purple-100"
                          onClick={() => window.location.href = `tel:${service.number}`}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          {service.number}
                        </Button>
                      </div>
                      <p className="text-sm text-purple-700">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedCountry && (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Select Your Country</h3>
            <p className="text-gray-500">Choose your country above to view relevant emergency and crisis support numbers.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}