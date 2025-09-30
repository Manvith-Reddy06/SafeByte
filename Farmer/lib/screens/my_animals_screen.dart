import 'package:flutter/material.dart';

class MyAnimalsScreen extends StatelessWidget {
  const MyAnimalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Placeholder UI for My Animals
    return Scaffold(
      appBar: AppBar(title: Text('My Animals'), leading: BackButton()),
      body: Center(
        child: Text(
          'View and manage your livestock here.',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
