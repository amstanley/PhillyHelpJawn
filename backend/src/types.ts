export interface Resource {
  id: string;
  name: string;
  category: string;
  eligibility: string | null;
  address: string;
  lat: number;
  lng: number;
  hours: string | null;
  phone: string | null;
  description: string | null;
}

export interface ResourceWithDistance extends Resource {
  distanceKm: number | null;
}

export interface AssistRequest {
  requestId: string;
  timestamp: string;
  inputModality: string;
  queryText: string;
  language: string;
  persona?: string;
  location?: {
    lat: number;
    lng: number;
    accuracyMeters?: number;
  };
  client: {
    platform: string;
    appVersion?: string;
    buildNumber?: string;
  };
  session?: {
    sessionId: string;
    turnIndex: number;
  };
}

export interface AssistResponse {
  requestId: string;
  timestamp: string;
  message: string;
  resources: ResourceWithDistance[];
}

export interface ErrorResponse {
  requestId: string;
  timestamp: string;
  error: string;
}
