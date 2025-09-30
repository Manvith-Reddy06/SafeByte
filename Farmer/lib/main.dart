import 'package:flutter/material.dart';
import 'package:sih_farmer/screens/record_treatment.dart';
import 'screens/dashboard_screen.dart';
import 'screens/medicine_advisor_screen.dart';
import 'screens/my_animals_screen.dart';
import 'screens/withdrawal_calendar_screen.dart';
import 'screens/signup.dart';

void main() {
  runApp(FarmGuardApp());
}

class FarmGuardApp extends StatelessWidget {
  const FarmGuardApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FarmGuard',
      theme: ThemeData(
        primarySwatch: Colors.green,
        scaffoldBackgroundColor: Color(0xFFF8F9FB),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => SignupScreen(),
        '/dashboard': (context) => DashboardScreen(),
        '/medicine-advisor': (context) => MedicineAdvisorScreen(),
        '/record-treatment': (context) => RecordTreatment(),
        '/my-animals': (context) => MyAnimalsScreen(),
        '/withdrawal-calendar': (context) => WithdrawalCalendarScreen(),
      },
    );
  }
}
