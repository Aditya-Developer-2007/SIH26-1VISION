// In-memory demo data store for AgroCure API fallback and rapid prototyping

export const demoStore = {
  users: [
    {
      id: "u_farmer_1",
      name: "Ramesh Kumar",
      phone: "9876543210",
      email: "ramesh.kumar@agrocure.demo",
      role: "FARMER",
      village: "Khedi Kalan",
      district: "Faridabad",
      state: "Haryana",
      bankAccount: "XXXX XXXX 4812",
      bankName: "State Bank of India",
      ifsc: "SBIN0001234",
      aadhaarLast4: "8912",
      landRecordId: "HR-FBD-2024-8841"
    },
    {
      id: "u_officer_1",
      name: "Vikram Singh",
      phone: "9876543211",
      email: "officer@agrocure.demo",
      role: "OFFICER",
      centreId: "centre_1",
      centreName: "Mandi Bhawan, Sector 12"
    },
    {
      id: "u_admin_1",
      name: "Ananya Sharma",
      phone: "9876543212",
      email: "admin@agrocure.demo",
      role: "ADMIN"
    }
  ],

  crops: [
    {
      id: "crop_1",
      name: "Wheat (गेहूं)",
      variety: "HD-2967",
      mspPerQuintal: 2425,
      season: "Rabi 2025-26",
      maxMoistureAllowed: 12.0
    },
    {
      id: "crop_2",
      name: "Paddy (धान)",
      variety: "Basmati 1121",
      mspPerQuintal: 2300,
      season: "Kharif 2025",
      maxMoistureAllowed: 14.0
    },
    {
      id: "crop_3",
      name: "Mustard (सरसों)",
      variety: "Pusa Bold",
      mspPerQuintal: 5650,
      season: "Rabi 2025-26",
      maxMoistureAllowed: 8.0
    }
  ],

  centres: [
    {
      id: "centre_1",
      name: "Mandi Bhawan, Sector 12",
      address: "Sector 12 Main Grain Market, Faridabad, Haryana",
      distanceKm: 2.4,
      capacityPct: 82,
      queueCount: 34,
      operatingHours: "08:00 AM - 06:00 PM",
      status: "OPEN",
      nextSlot: "Tomorrow, 10:00 AM - 12:00 PM",
      contactPhone: "+91 129 2244556"
    },
    {
      id: "centre_2",
      name: "Krishi Procurement Centre",
      address: "Old GT Road, Ballabgarh, Haryana",
      distanceKm: 5.8,
      capacityPct: 45,
      queueCount: 12,
      operatingHours: "08:30 AM - 05:30 PM",
      status: "OPEN",
      nextSlot: "Tomorrow, 11:30 AM - 01:30 PM",
      contactPhone: "+91 129 2334411"
    },
    {
      id: "centre_3",
      name: "District Grain Market Yard",
      address: "Anaj Mandi, Palwal, Haryana",
      distanceKm: 14.2,
      capacityPct: 91,
      queueCount: 58,
      operatingHours: "07:30 AM - 06:30 PM",
      status: "HIGH_TRAFFIC",
      nextSlot: "Tomorrow, 02:00 PM - 04:00 PM",
      contactPhone: "+91 1275 251122"
    }
  ],

  procurements: [
    {
      id: "proc_1",
      procurementNumber: "PROC-2026-9821",
      farmerId: "u_farmer_1",
      farmerName: "Ramesh Kumar",
      farmerPhone: "9876543210",
      cropId: "crop_1",
      cropName: "Wheat",
      estimatedQuantityQuintals: 18.5,
      actualWeightQuintals: 18.5,
      mspPerQuintal: 2425,
      totalAmount: 44862.50,
      centreId: "centre_1",
      centreName: "Mandi Bhawan, Sector 12",
      tokenId: "AGRO-2048",
      slotDate: "2026-08-31",
      slotTime: "10:00 AM - 12:00 PM",
      status: "SCHEDULED", // REGISTERED, VERIFIED, TOKEN_GENERATED, SCHEDULED, QUALITY_CHECK, PROCURED, PAYMENT_INITIATED, PAYMENT_RECEIVED
      paymentStatus: "INITIATED", // PENDING, PROCESSING, INITIATED, CREDITED, FAILED
      paymentRef: "UTR992810482026",
      qualityGrade: "Grade A",
      moisturePct: 10.8,
      createdAt: "2026-08-28T09:20:00.000Z",
      journeySteps: [
        { key: "registration", label: "Registration", status: "completed", timestamp: "28 Aug 2026, 09:20 AM", note: "Land record HR-FBD-2024-8841 linked successfully" },
        { key: "verification", label: "Verification", status: "completed", timestamp: "28 Aug 2026, 11:10 AM", note: "Aadhaar & revenue department verification complete" },
        { key: "token_generated", label: "Token Generated", status: "completed", timestamp: "28 Aug 2026, 11:25 AM", note: "Token AGRO-2048 assigned for Mandi Bhawan" },
        { key: "slot_scheduled", label: "Procurement Visit", status: "active", timestamp: "Scheduled: 31 Aug, 10:00 AM", note: "Slot confirmed. Bring Aadhaar, Land Record & Digital Token" },
        { key: "quality_check", label: "Quality & Weighment", status: "pending", timestamp: "Pending visit", note: "Inspector check at Mandi Bhawan" },
        { key: "procurement", label: "Procurement Completed", status: "pending", timestamp: "Pending weighment", note: "J-Form receipt will be issued upon weighment" },
        { key: "payment_initiated", label: "Payment Initiated", status: "pending", timestamp: "Pending bill generation", note: "Direct bank transfer to SBI XXXX 4812" },
        { key: "payment_received", label: "Payment Received", status: "pending", timestamp: "Expected within 48h", note: "Direct Benefit Transfer (DBT)" }
      ]
    }
  ],

  tokens: [
    {
      id: "token_1",
      tokenNumber: "AGRO-2048",
      procurementId: "proc_1",
      farmerId: "u_farmer_1",
      farmerName: "Ramesh Kumar",
      cropName: "Wheat",
      quantityQuintals: 18.5,
      centreName: "Mandi Bhawan, Sector 12",
      centreAddress: "Sector 12 Main Grain Market, Faridabad, Haryana",
      slotDate: "31 August 2026",
      slotTime: "10:00 AM - 12:00 PM",
      status: "CONFIRMED",
      qrCodeData: "AGROCURE|AGRO-2048|RAMESH_KUMAR|WHEAT|18.5Q|MANDI_BHAWAN|20260831",
      requiredDocs: [
        "Aadhaar Card (Original)",
        "Land Record Ownership Document (Fard)",
        "Bank Passbook / Cancelled Cheque",
        "AgroCure Digital Token QR Pass"
      ]
    }
  ],

  payments: [
    {
      id: "pay_1",
      paymentNumber: "PAY-2026-7741",
      procurementId: "proc_1",
      farmerId: "u_farmer_1",
      farmerName: "Ramesh Kumar",
      cropName: "Wheat",
      quantityQuintals: 18.5,
      mspPerQuintal: 2425,
      totalAmount: 44862.50,
      bankName: "State Bank of India",
      maskedAccount: "XXXX XXXX 4812",
      ifsc: "SBIN0001234",
      utrReference: "UTR992810482026",
      status: "INITIATED", // PENDING, PROCESSING, INITIATED, CREDITED, FAILED
      initiatedAt: "30 Aug 2026, 08:30 AM",
      expectedCreditAt: "31 Aug 2026, 04:00 PM",
      timeline: [
        { label: "Procurement Completed", date: "30 Aug 2026, 07:15 AM", done: true },
        { label: "J-Form & Bill Generated", date: "30 Aug 2026, 07:30 AM", done: true },
        { label: "Payment Initiated (DBT Pipeline)", date: "30 Aug 2026, 08:30 AM", done: true, active: true },
        { label: "Bank Account Credit", date: "Expected 31 Aug 2026", done: false }
      ]
    }
  ],

  documents: [
    {
      id: "doc_1",
      docType: "J-FORM",
      title: "J-Form Procurement Receipt",
      docNumber: "JFORM-2026-8812",
      date: "30 Aug 2026",
      farmerName: "Ramesh Kumar",
      crop: "Wheat (18.5 Quintal)",
      amount: "₹44,862.50",
      status: "AVAILABLE",
      fileUrl: "/api/documents/download/doc_1"
    },
    {
      id: "doc_2",
      docType: "TOKEN_PASS",
      title: "AgroCure Digital Token Pass",
      docNumber: "AGRO-2048",
      date: "28 Aug 2026",
      farmerName: "Ramesh Kumar",
      crop: "Wheat (18.5 Quintal)",
      amount: "Slot: 31 Aug, 10:00 AM",
      status: "AVAILABLE",
      fileUrl: "/api/documents/download/doc_2"
    },
    {
      id: "doc_3",
      docType: "LAND_RECORD",
      title: "Verified Revenue Land Record",
      docNumber: "HR-FBD-2024-8841",
      date: "28 Aug 2026",
      farmerName: "Ramesh Kumar",
      crop: "Area: 2.5 Acres",
      amount: "Status: Verified",
      status: "VERIFIED",
      fileUrl: "/api/documents/download/doc_3"
    }
  ],

  notifications: [
    {
      id: "notif_1",
      farmerId: "u_farmer_1",
      title: "Wheat Procurement Visit Reminder",
      message: "Your wheat procurement is scheduled for tomorrow at 10:00 AM at Mandi Bhawan, Sector 12. Please carry your Aadhaar, Land Record & Digital Token AGRO-2048.",
      category: "IMPORTANT",
      timestamp: "Today, 08:00 AM",
      read: false
    },
    {
      id: "notif_2",
      farmerId: "u_farmer_1",
      title: "Payment Transfer Initiated",
      message: "Payment of ₹44,862.50 for 18.5 quintal Wheat has been initiated via Direct Benefit Transfer to SBI account ending 4812. Ref: UTR992810482026.",
      category: "PAYMENTS",
      timestamp: "Yesterday, 08:30 AM",
      read: true
    },
    {
      id: "notif_3",
      farmerId: "u_farmer_1",
      title: "Digital Token AGRO-2048 Confirmed",
      message: "Your procurement token AGRO-2048 is confirmed. Slot: 31 Aug, 10:00 AM - 12:00 PM at Mandi Bhawan.",
      category: "UPDATES",
      timestamp: "28 Aug, 11:25 AM",
      read: true
    }
  ],

  grievances: [
    {
      id: "grv_1",
      ticketNumber: "GRV-2026-1042",
      farmerId: "u_farmer_1",
      farmerName: "Ramesh Kumar",
      farmerPhone: "9876543210",
      category: "PAYMENT",
      subject: "Expected bank credit timeframe query",
      description: "My procurement was processed and payment initiated. Kindly confirm the estimated bank account credit timeline.",
      status: "RESOLVED", // SUBMITTED, UNDER_REVIEW, RESOLVED, REJECTED
      response: "Your payment reference UTR992810482026 has been processed via RBI NeFT/DBT pipeline. Amount ₹44,862.50 will reflect in your SBI account ending 4812 by 4:00 PM tomorrow.",
      createdAt: "29 Aug 2026, 02:15 PM",
      updatedAt: "29 Aug 2026, 04:30 PM"
    }
  ]
};
