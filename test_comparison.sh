#!/bin/bash

echo "======================================"
echo "DietMed Global - Comparison Test"
echo "======================================"
echo ""

# Test 1: Compare 2 products
echo "Test 1: Wegovy vs Saxenda 비교"
echo "--------------------------------------"
curl -s "http://localhost:3000/api/compare?products=PROD001,PROD002&country=KR" | jq '{
  product_count: (.products | length),
  products: [.products[] | {
    name: .product_name, 
    generic: .generic_name,
    approved_countries: .approved_countries_count,
    safety_score: .safety_score.total,
    grade: .safety_score.grade
  }]
}'
echo ""

# Test 2: Compare 3 products
echo "Test 2: Wegovy vs Saxenda vs Xenical 비교"
echo "--------------------------------------"
curl -s "http://localhost:3000/api/compare?products=PROD001,PROD002,PROD003&country=US" | jq '{
  product_count: (.products | length),
  products: [.products[] | {
    name: .product_name,
    mechanism: (.safety_profile.mechanism_detail // "-"),
    weight_loss_6mo: (.safety_profile.weight_loss_6mo // "-")
  }]
}'
echo ""

# Test 3: Comparison criteria
echo "Test 3: 비교 항목 확인"
echo "--------------------------------------"
curl -s "http://localhost:3000/api/compare?products=PROD001,PROD002&country=KR" | jq '{
  criteria_count: (.criteria | length),
  categories: [.criteria | group_by(.category) | .[] | {
    category: .[0].category,
    count: length
  }]
}'
echo ""

echo "======================================"
echo "All tests completed!"
echo "======================================"
