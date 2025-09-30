import 'package:flutter/material.dart';
import 'screens/digital_prescription.dart';
import 'screens/dosage_calculator.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 30),
            // Statistic cards row
            Row(
              children: [
                Expanded(
                  child: _StatCard(
                    icon: Icons.description,
                    label: "Today's Prescriptions",
                    value: '23',
                    color: const Color(0xFFE7EDFB),
                    iconColor: const Color(0xFF6B7AFF),
                  ),
                ),
                Expanded(
                  child: _StatCard(
                    icon: Icons.calculate,
                    label: 'Dosage Calculations',
                    value: '47',
                    color: const Color(0xFFF6F0FF),
                    iconColor: Color(0xFFB47AFF),
                  ),
                ),
                Expanded(
                  child: _StatCard(
                    icon: Icons.warning_amber_rounded,
                    label: 'Drug \nChecks',
                    value: '12',
                    color: const Color(0xFFFFF6E7),
                    iconColor: Color(0xFFFFA726),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            // Recent Activity section
            const Text(
              'Recent Activity',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 12),
            _ActivityItem(
              icon: Icons.description,
              iconBg: Color(0xFFE7FBE7),
              iconColor: Color(0xFF4CAF50),
              title: 'Prescription created for Farm #B123',
              time: '2 minutes ago',
              status: 'New',
              statusColor: Color(0xFFEAEBF0),
              statusTextColor: Color(0xFF5A5A5A),
            ),
            _ActivityItem(
              icon: Icons.calculate,
              iconBg: Color(0xFFF6F0FF),
              iconColor: Color(0xFFB47AFF),
              title: 'Dosage calculated for 50 cattle',
              time: '15 minutes ago',
              status: 'Completed',
              statusColor: Color(0xFFF3F6FB),
              statusTextColor: Color(0xFF5A5A5A),
            ),
            _ActivityItem(
              icon: Icons.warning_amber_rounded,
              iconBg: Color(0xFFFFF6E7),
              iconColor: Color(0xFFFFA726),
              title: 'Drug interaction check completed',
              time: '1 hour ago',
              status: 'Completed',
              statusColor: Color(0xFFF3F6FB),
              statusTextColor: Color(0xFF5A5A5A),
            ),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              icon: const Icon(Icons.description),
              label: const Text('Digital Prescription'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 18),
                textStyle: const TextStyle(fontSize: 18),
                backgroundColor: const Color.fromARGB(255, 130, 225, 133),
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const DigitalPrescriptionScreen(),
                  ),
                );
              },
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              icon: const Icon(Icons.calculate),
              label: const Text('Dosage Calculator'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 18),
                textStyle: const TextStyle(fontSize: 18),
                backgroundColor: const Color.fromARGB(255, 235, 225, 132),
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const DosageCalculatorScreen(),
                  ),
                );
              },
            ),
            // Add more dashboard content here if needed
          ],
        ),
      ),
    );
  }
}

// Add these widgets at the bottom of the file:

class _StatCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;
  final Color iconColor;
  const _StatCard({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
    required this.iconColor,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 180,
      margin: const EdgeInsets.all(8),
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.7),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: iconColor, size: 28),
          ),
          const SizedBox(height: 12),
          Text(
            label,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16, color: Colors.black87),
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}

class _ActivityItem extends StatelessWidget {
  final IconData icon;
  final Color iconBg;
  final Color iconColor;
  final String title;
  final String time;
  final String status;
  final Color statusColor;
  final Color statusTextColor;
  const _ActivityItem({
    required this.icon,
    required this.iconBg,
    required this.iconColor,
    required this.title,
    required this.time,
    required this.status,
    required this.statusColor,
    required this.statusTextColor,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFF3F6FB)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: iconBg,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: iconColor, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  time,
                  style: const TextStyle(fontSize: 13, color: Colors.black54),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: statusColor,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              status,
              style: TextStyle(fontSize: 13, color: statusTextColor),
            ),
          ),
        ],
      ),
    );
  }
}
