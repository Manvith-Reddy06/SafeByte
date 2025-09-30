import 'package:flutter/material.dart';
import '../dummy_alerts.dart';

class AlertsList extends StatelessWidget {
  const AlertsList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: dummyAlerts
          .map(
            (alert) => Card(
              margin: const EdgeInsets.symmetric(vertical: 6),
              child: ListTile(
                leading: Text(alert.icon, style: const TextStyle(fontSize: 28)),
                title: Text(
                  alert.title,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Text(alert.description),
                contentPadding: const EdgeInsets.symmetric(
                  vertical: 8,
                  horizontal: 12,
                ),
              ),
            ),
          )
          .toList(),
    );
  }
}
