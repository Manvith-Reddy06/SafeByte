import 'package:flutter/material.dart';

class WithdrawalCalendarScreen extends StatelessWidget {
  const WithdrawalCalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Placeholder UI for Withdrawal Calendar
    return Scaffold(
      appBar: AppBar(title: Text('Withdrawal Calendar'), leading: BackButton()),
      body: Center(
        child: Text(
          'Track withdrawal periods and compliance here.',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
