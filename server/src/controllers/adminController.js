import { demoStore } from '../utils/demoStore.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const kpis = {
      totalRegisteredFarmers: 12480,
      todayProcurementQuintals: 1845.0,
      totalPayoutAmount: 4474125.00,
      activeCentresCount: 18,
      pendingGrievancesCount: demoStore.grievances.filter(g => g.status !== 'RESOLVED').length
    };

    const cropBreakdown = [
      { name: "Wheat (गेहूं)", totalQuintals: 1240.5, totalPayout: 3008212.50, pct: 67 },
      { name: "Mustard (सरसों)", totalQuintals: 420.0, totalPayout: 2373000.00, pct: 23 },
      { name: "Paddy (धान)", totalQuintals: 184.5, totalPayout: 424350.00, pct: 10 }
    ];

    const recentProcurements = demoStore.procurements;
    const centres = demoStore.centres;
    const grievances = demoStore.grievances;

    return res.status(200).json({
      success: true,
      kpis,
      cropBreakdown,
      recentProcurements,
      centres,
      grievances
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const exportReportCsv = async (req, res) => {
  try {
    let csvContent = "Procurement ID,Farmer Name,Phone,Crop,Quantity (Quintal),MSP (INR),Total Amount (INR),Centre,Status,Date\n";
    demoStore.procurements.forEach(p => {
      csvContent += `${p.procurementNumber},"${p.farmerName}",${p.farmerPhone},${p.cropName},${p.estimatedQuantityQuintals},${p.mspPerQuintal},${p.totalAmount},"${p.centreName}",${p.status},${p.slotDate}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="AgroCure_Procurement_Report.csv"');
    return res.status(200).send(csvContent);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
