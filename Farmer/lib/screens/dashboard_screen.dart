import 'package:flutter/material.dart';
import '../widgets/alerts_list.dart';

class DashboardScreen extends StatelessWidget {
  final String? farmerId;
  final String? farmerName;
  const DashboardScreen({this.farmerId, this.farmerName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.all(20),
          children: [
            SizedBox(height: 10),
            Center(
              child: Column(
                children: [
                  Text(
                    'Welcome to',
                    style: TextStyle(fontSize: 18, color: Colors.grey[700]),
                  ),
                  Text(
                    'FarmGaurd',
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                  ),
                  if (farmerName != null && farmerName!.isNotEmpty) ...[
                    Text(
                      farmerName!,
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                  ],
                  if (farmerId != null) ...[
                    SizedBox(height: 6),
                    Text(
                      'ID: $farmerId',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.green[800],
                      ),
                    ),
                  ],
                ],
              ),
            ),
            SizedBox(height: 30),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _dashboardStat('7', 'My Animals'),
                _dashboardStat('11', 'Active Treatments'),
                _dashboardStat('0', 'Pending Alerts'),
              ],
            ),
            SizedBox(height: 30),
            Text(
              'Quick Actions',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            SizedBox(height: 10),
            _quickAction(
              context,
              icon: Icons.medication,
              color: Colors.green[100]!,
              title: 'Get Medicine Advice',
              subtitle: 'AI-powered treatment suggestions for your animals',
              route: '/medicine-advisor',
            ),
            _quickAction(
              context,
              icon: Icons.add,
              color: Colors.blue[50]!,
              title: 'Record Treatment',
              subtitle: 'Log new antimicrobial treatments',
              route: '/record-treatment',
            ),
            _quickAction(
              context,
              icon: Icons.people,
              color: Colors.purple[50]!,
              title: 'My Animals',
              subtitle: 'View and manage your livestock',
              route: '/my-animals',
            ),
            _quickAction(
              context,
              icon: Icons.calendar_today,
              color: Colors.yellow[50]!,
              title: 'Withdrawal Calendar',
              subtitle: 'Track withdrawal periods and compliance',
              route: '/withdrawal-calendar',
            ),
            SizedBox(height: 20),
            Text(
              'Recent Alerts',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            SizedBox(height: 10),
            const AlertsList(),
          ],
        ),
      ),
    );
  }

  Color getAlertColor(String type) {
    switch (type) {
      case 'MRL':
        return Colors.orange;
      case 'WITHDRAWAL':
        return Colors.green;
      case 'HEALTH':
        return Colors.purple;
      case 'PRESCRIPTION':
        return Colors.blueGrey;
      case 'DRUG':
        return Colors.blue;
      case 'TREATMENT':
        return Colors.redAccent;
      default:
        return Colors.grey;
    }
  }

  Widget _dashboardStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
        ),
        Text(label, style: TextStyle(fontSize: 14, color: Colors.grey[600])),
      ],
    );
  }

  Widget _quickAction(
    BuildContext context, {
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required String route,
  }) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 6),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: color,
          child: Icon(icon, color: Colors.green[800]),
        ),
        title: Text(title, style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        onTap: () => Navigator.pushNamed(context, route),
      ),
    );
  }
}
