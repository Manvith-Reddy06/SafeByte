import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'dart:math';
import 'dashboard_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  String? _selectedLanguage;
  String? _selectedFarmType;
  String? _farmerId;

  final List<String> _languages = ['English', 'हिन्दी', 'తెలుగు'];

  final List<String> _farmTypes = [
    'Cattle',
    'Small Ruminant',
    'Poultry',
    'Swine',
  ];

  String _generateFarmerId() {
    final random = Random();
    final randomDigits = random.nextInt(9000) + 1000; // 4-digit number
    return 'FARM$randomDigits';
  }

  void _onSubmit() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _farmerId = _generateFarmerId();
      });
      // Navigate to dashboard after signup, passing the farmerId
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => DashboardScreen(
            farmerId: _farmerId,
            farmerName: _nameController.text,
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('FarmGaurd')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DropdownButtonFormField2<String>(
                decoration: InputDecoration(
                  labelText: 'Select Language',
                  border: OutlineInputBorder(),
                ),
                isExpanded: true,
                value: _selectedLanguage,
                items: _languages
                    .map(
                      (lang) =>
                          DropdownMenuItem(value: lang, child: Text(lang)),
                    )
                    .toList(),
                onChanged: (val) => setState(() => _selectedLanguage = val),
                validator: (val) =>
                    val == null ? 'Please select a language' : null,
                dropdownStyleData: DropdownStyleData(
                  useSafeArea: true,
                  maxHeight: 200,
                ),
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Farmer Name',
                  border: OutlineInputBorder(),
                ),
                validator: (val) => val == null || val.isEmpty
                    ? 'Please enter your name'
                    : null,
              ),
              SizedBox(height: 16),
              DropdownButtonFormField2<String>(
                decoration: InputDecoration(
                  labelText: 'Farm Type',
                  border: OutlineInputBorder(),
                ),
                isExpanded: true,
                value: _selectedFarmType,
                items: _farmTypes
                    .map(
                      (type) =>
                          DropdownMenuItem(value: type, child: Text(type)),
                    )
                    .toList(),
                onChanged: (val) => setState(() => _selectedFarmType = val),
                validator: (val) =>
                    val == null ? 'Please select a farm type' : null,
                dropdownStyleData: DropdownStyleData(
                  useSafeArea: true,
                  maxHeight: 200,
                ),
              ),
              SizedBox(height: 24),
              Center(
                child: ElevatedButton(
                  onPressed: _onSubmit,
                  child: Text('Sign Up'),
                ),
              ),
              if (_farmerId != null) ...[
                SizedBox(height: 24),
                Center(
                  child: Text(
                    'Your Farmer ID: $_farmerId',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
