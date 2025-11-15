import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import EmergencyBanner from "../components/emergency-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search, 
  Phone, 
  Globe, 
  Clock, 
  Heart,
  Users,
  Shield,
  AlertTriangle,
  ExternalLink,
  Filter,
  Star,
  CheckCircle,
  Loader2,
  MapIcon
} from "lucide-react";

interface ResourceType {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const resourceTypes: ResourceType[] = [
  {
    id: "therapy",
    name: "Individual Therapy",
    description: "One-on-one counseling sessions with licensed therapists",
    icon: Heart,
    color: "text-red-500"
  },
  {
    id: "group",
    name: "Group Therapy",
    description: "Supportive group sessions with peers facing similar challenges",
    icon: Users,
    color: "text-blue-500"
  },
  {
    id: "crisis",
    name: "Crisis Support",
    description: "Immediate help for mental health emergencies",
    icon: AlertTriangle,
    color: "text-orange-500"
  },
  {
    id: "teen",
    name: "Teen-Specific Services",
    description: "Mental health services designed specifically for teenagers",
    icon: Star,
    color: "text-purple-500"
  },
  {
    id: "family",
    name: "Family Therapy",
    description: "Counseling services that involve family members",
    icon: Shield,
    color: "text-green-500"
  },
  {
    id: "support",
    name: "Support Groups",
    description: "Peer support groups for various mental health conditions",
    icon: CheckCircle,
    color: "text-teal-500"
  }
];

// Location-specific mental health resources database
const locationResources: { [key: string]: any[] } = {
  "guwahati": [
    {
      id: 1,
      name: "LGBRIMH (Lokopriya Gopinath Bordoloi Regional Institute of Mental Health)",
      type: "therapy",
      address: "Tezpur, Sonitpur District, Assam 784001",
      phone: "+91 3712 267180",
      website: "https://lgbrimh.gov.in",
      description: "Premier mental health institute in Northeast India offering comprehensive psychiatric services including adolescent mental health programs.",
      hours: "Mon-Fri 9AM-5PM, Emergency 24/7",
      rating: 4.5,
      distance: "75 km from Guwahati",
      acceptsInsurance: true,
      languages: ["English", "Assamese", "Hindi"],
      services: ["Individual Therapy", "Psychiatric Care", "Crisis Support", "Family Counseling"]
    },
    {
      id: 2,
      name: "Nemcare Superspeciality Hospital - Psychiatry Department",
      type: "therapy",
      address: "Bhangagarh, Guwahati, Assam 781005",
      phone: "+91 361 2464656",
      website: "https://nemcarehospitals.com",
      description: "Multi-specialty hospital with dedicated psychiatry and psychology services for teens and adults.",
      hours: "Mon-Sat 10AM-6PM, Sun 10AM-2PM",
      rating: 4.3,
      distance: "City Center",
      acceptsInsurance: true,
      languages: ["English", "Assamese", "Hindi", "Bengali"],
      services: ["Individual Therapy", "Psychiatric Consultation", "Counseling"]
    },
    {
      id: 3,
      name: "Apollo Hospitals Guwahati - Mental Health Services",
      type: "therapy",
      address: "Noonmati, Guwahati, Assam 781020",
      phone: "+91 361 2678000",
      website: "https://apollohospitals.com",
      description: "Comprehensive healthcare facility with specialized mental health and counseling services for adolescents.",
      hours: "24/7 Emergency, OPD 9AM-6PM",
      rating: 4.4,
      distance: "12 km from city center",
      acceptsInsurance: true,
      languages: ["English", "Assamese", "Hindi"],
      services: ["Individual Therapy", "Family Counseling", "Crisis Support", "Teen Programs"]
    },
    {
      id: 4,
      name: "Pratiksha - Mental Health NGO",
      type: "support",
      address: "Ulubari, Guwahati, Assam 781007",
      phone: "+91 361 2601234",
      website: "https://pratiksha-assam.org",
      description: "Non-profit organization providing free and affordable mental health support, especially for youth and marginalized communities.",
      hours: "Mon-Fri 10AM-5PM",
      rating: 4.6,
      distance: "City Center",
      acceptsInsurance: false,
      languages: ["English", "Assamese", "Hindi"],
      services: ["Support Groups", "Counseling", "Peer Support", "Community Programs"]
    }
  ],
  "mumbai": [
    {
      id: 5,
      name: "Tata Institute of Social Sciences - Centre for Mental Health",
      type: "therapy",
      address: "V.N. Purav Marg, Deonar, Mumbai 400088",
      phone: "+91 22 2552 5000",
      website: "https://tiss.edu",
      description: "Leading institute offering mental health services with specialized programs for adolescents and young adults.",
      hours: "Mon-Fri 9AM-5PM",
      rating: 4.7,
      distance: "Eastern Suburbs",
      acceptsInsurance: true,
      languages: ["English", "Hindi", "Marathi"],
      services: ["Individual Therapy", "Group Therapy", "Research-based Treatment", "Teen Programs"]
    }
  ],
  "delhi": [
    {
      id: 6,
      name: "AIIMS Department of Psychiatry",
      type: "therapy",
      address: "All India Institute of Medical Sciences, New Delhi 110029",
      phone: "+91 11 2659 3676",
      website: "https://aiims.edu",
      description: "Premier medical institute with comprehensive psychiatric services including specialized adolescent mental health programs.",
      hours: "Mon-Sat 8AM-2PM",
      rating: 4.8,
      distance: "Central Delhi",
      acceptsInsurance: true,
      languages: ["English", "Hindi"],
      services: ["Individual Therapy", "Psychiatric Care", "Research Programs", "Crisis Support"]
    },
    {
      id: 7,
      name: "Institute of Human Behaviour and Allied Sciences (IHBAS)",
      type: "therapy",
      address: "Dilshad Garden, Delhi 110095",
      phone: "+91 11 2231 3391",
      website: "https://ihbas.delhigovt.nic.in",
      description: "Specialized mental health hospital with comprehensive services for adolescents and adults.",
      hours: "Mon-Sat 9AM-5PM",
      rating: 4.6,
      distance: "East Delhi",
      acceptsInsurance: true,
      languages: ["English", "Hindi"],
      services: ["Individual Therapy", "Psychiatric Care", "Crisis Support", "Family Counseling"]
    }
  ],
  "bangalore": [
    {
      id: 8,
      name: "NIMHANS (National Institute of Mental Health and Neurosciences)",
      type: "therapy",
      address: "Hosur Road, Bangalore 560029",
      phone: "+91 80 2699 5017",
      website: "https://nimhans.ac.in",
      description: "India's premier mental health institute offering world-class psychiatric services and research programs.",
      hours: "Mon-Sat 8AM-6PM",
      rating: 4.9,
      distance: "South Bangalore",
      acceptsInsurance: true,
      languages: ["English", "Hindi", "Kannada"],
      services: ["Individual Therapy", "Psychiatric Care", "Research Programs", "Teen Specialized Care"]
    },
    {
      id: 9,
      name: "Cadabams Hospitals",
      type: "therapy",
      address: "Sarjapur Road, Bangalore 560035",
      phone: "+91 97414 76476",
      website: "https://cadabamshospitals.com",
      description: "Multi-specialty mental health facility with dedicated adolescent and youth mental health programs.",
      hours: "24/7 Emergency, OPD 9AM-6PM",
      rating: 4.7,
      distance: "Sarjapur Road",
      acceptsInsurance: true,
      languages: ["English", "Hindi", "Kannada", "Tamil"],
      services: ["Individual Therapy", "Group Therapy", "Crisis Support", "Family Counseling"]
    }
  ],
  "chennai": [
    {
      id: 10,
      name: "Schizophrenia Research Foundation (SCARF)",
      type: "therapy",
      address: "R-7A, North Main Road, Anna Nagar West, Chennai 600040",
      phone: "+91 44 2615 1073",
      website: "https://scarfindia.org",
      description: "Leading mental health organization providing comprehensive psychiatric services and community support programs.",
      hours: "Mon-Fri 9AM-5PM, Sat 9AM-1PM",
      rating: 4.5,
      distance: "Anna Nagar",
      acceptsInsurance: true,
      languages: ["English", "Tamil", "Hindi"],
      services: ["Individual Therapy", "Support Groups", "Family Counseling", "Community Programs"]
    }
  ],
  "hyderabad": [
    {
      id: 11,
      name: "Asha Hospital - Department of Psychiatry",
      type: "therapy",
      address: "Banjara Hills, Hyderabad 500034",
      phone: "+91 40 4455 0000",
      website: "https://ashahospital.com",
      description: "Multi-specialty hospital with dedicated mental health services for adolescents and adults.",
      hours: "Mon-Sat 10AM-6PM",
      rating: 4.4,
      distance: "Banjara Hills",
      acceptsInsurance: true,
      languages: ["English", "Telugu", "Hindi"],
      services: ["Individual Therapy", "Psychiatric Consultation", "Crisis Support"]
    }
  ]
};

// Default resources for unknown locations
const defaultResources = [
  {
    id: 100,
    name: "National Mental Health Programme Helpline",
    type: "crisis",
    address: "Ministry of Health & Family Welfare, Government of India",
    phone: "1800-599-0019",
    website: "https://mohfw.gov.in",
    description: "National helpline providing mental health support and guidance. Available in multiple languages across India.",
    hours: "24/7",
    rating: 4.2,
    distance: "National Service",
    acceptsInsurance: false,
    languages: ["English", "Hindi", "Regional Languages"],
    services: ["Crisis Support", "Counseling", "Referrals", "Information"]
  },
  {
    id: 101,
    name: "Vandrevala Foundation Helpline",
    type: "crisis",
    address: "Mumbai-based National Mental Health Service",
    phone: "+91 9999 666 555",
    website: "https://vandrevalafoundation.com",
    description: "24/7 mental health helpline providing counseling and crisis intervention services across India.",
    hours: "24/7",
    rating: 4.5,
    distance: "National Service",
    acceptsInsurance: false,
    languages: ["English", "Hindi", "Regional Languages"],
    services: ["Crisis Support", "Counseling", "Suicide Prevention", "Emotional Support"]
  }
];

export default function FindHelpPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const toggleResourceType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const searchResources = () => {
    if (!searchLocation.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const locationKey = searchLocation.toLowerCase().trim();
      let foundResources: any[] = [];
      
      // Check if we have specific resources for this location
      if (locationResources[locationKey]) {
        foundResources = locationResources[locationKey];
      } else {
        // Search for partial matches
        const matchedKey = Object.keys(locationResources).find(key => 
          key.includes(locationKey) || locationKey.includes(key)
        );
        
        if (matchedKey) {
          foundResources = locationResources[matchedKey];
        }
      }
      
      // Always include national resources
      const allResources = [...foundResources, ...defaultResources];
      
      setSearchResults(allResources);
      setHasSearched(true);
      setIsSearching(false);
    }, 1000);
  };

  // Use actual search results or show default message
  const displayResources = hasSearched ? searchResults : [];
  
  // Apply type filters
  const filteredResources = selectedTypes.length === 0 
    ? displayResources 
    : displayResources.filter((resource: any) => selectedTypes.includes(resource.type));

  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ecb4a7] to-[#f9dcd1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#59291f] mb-4">
            Find Help Near You
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Locate mental health professionals, support groups, and crisis resources in your area. 
            Get connected with qualified professionals who can provide the support you need.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#59291f] mb-6">Search for Mental Health Resources</h2>
            
            {/* Location Search */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your location (city, state, or zip code)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="location"
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="e.g., New York, NY or 10001"
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filter by Service Type</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Resource Type Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {resourceTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      onClick={() => toggleResourceType(type.id)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        isSelected
                          ? "border-[#59291f] bg-[#f9dcd1]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <Icon className={`h-5 w-5 ${type.color} mr-3 mt-0.5 flex-shrink-0`} />
                        <div>
                          <div className="font-medium text-gray-900">{type.name}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <Button 
              onClick={searchResources}
              disabled={!searchLocation.trim() || isSearching}
              className="w-full md:w-auto bg-[#59291f] hover:bg-[#4a1f17] text-white disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Resources
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#59291f]">
                {hasSearched ? `Mental Health Resources ${searchLocation ? `in ${searchLocation}` : ''}` : 'Search Results'}
              </h2>
              {hasSearched && (
                <span className="text-gray-600">
                  {filteredResources.length} resources found
                </span>
              )}
            </div>

            {!hasSearched ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <MapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Find Mental Health Resources</h3>
                <p className="text-gray-600 mb-6">
                  Enter your location above to discover mental health professionals, support groups, and crisis resources in your area.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Try searching for cities like: Guwahati, Mumbai, Delhi, Bangalore, Chennai, Hyderabad, or your zip code</p>
                </div>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <AlertTriangle className="h-16 w-16 text-orange-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resources Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find specific resources for "{searchLocation}" with your selected filters. Try adjusting your search or removing filters.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Try a broader location (e.g., state or region)</p>
                  <p>• Remove service type filters</p>
                  <p>• Check the national resources below</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const typeInfo = resourceTypes.find(t => t.id === resource.type);
                const TypeIcon = typeInfo?.icon || Heart;
                
                return (
                  <div key={resource.id} className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        <TypeIcon className={`h-6 w-6 ${typeInfo?.color || 'text-gray-500'} mr-3 mt-1 flex-shrink-0`} />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(resource.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">
                                {resource.rating} • {resource.distance}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {resource.acceptsInsurance && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Insurance
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{resource.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        {resource.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <a href={`tel:${resource.phone}`} className="hover:text-[#59291f]">
                          {resource.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        {resource.hours}
                      </div>
                      {resource.website && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                          <a 
                            href={resource.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-[#59291f] flex items-center"
                          >
                            Visit Website
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.services.map((service: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-[#f9dcd1] text-[#59291f] text-xs px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Languages: {resource.languages.join(", ")}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`tel:${resource.phone}`)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`)}
                        >
                          <MapPin className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#59291f] mb-6">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <Phone className="h-8 w-8 text-[#59291f] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">National Mental Health Programme</h3>
                <p className="text-gray-600 text-sm mb-3">24/7 mental health support helpline by Government of India</p>
                <a href="tel:1800-599-0019" className="text-[#59291f] font-medium hover:text-[#4a1f17]">
                  Call 1800-599-0019
                </a>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg">
                <Heart className="h-8 w-8 text-[#59291f] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Vandrevala Foundation</h3>
                <p className="text-gray-600 text-sm mb-3">Free, 24/7 mental health helpline across India</p>
                <a href="tel:+919999666555" className="text-[#59291f] font-medium hover:text-[#4a1f17]">
                  Call +91 9999 666 555
                </a>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg">
                <Globe className="h-8 w-8 text-[#59291f] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">iCall Helpline</h3>
                <p className="text-gray-600 text-sm mb-3">Psychosocial helpline by TISS Mumbai for emotional support</p>
                <a href="tel:+919152987821" className="text-[#59291f] font-medium hover:text-[#4a1f17]">
                  Call +91 9152 987 821
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}